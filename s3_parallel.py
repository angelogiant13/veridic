import os
import time
import concurrent.futures
import threading
import math
from s3_setup import S3Manager

class NetworkSpeedTest:
    def __init__(self, s3_client, bucket):
        self.s3_client = s3_client
        self.bucket = bucket
        self.test_sizes = [256 * 1024, 1024 * 1024]
    
    def measure_speed(self):
        speeds = []
        for size in self.test_sizes:
            test_data = os.urandom(size)
            key = f"speedtest_{int(time.time())}_{size}"
            try:
                start = time.time()
                self.s3_client.put_object(
                    Bucket=self.bucket,
                    Key=key,
                    Body=test_data
                )
                duration = time.time() - start
                speed = size / duration / (1024 * 1024)
                speeds.append(speed)
                self.s3_client.delete_object(Bucket=self.bucket, Key=key)
            except Exception as e:
                print(f"⚠️  Speed test error: {str(e)}")
        return max(speeds) if speeds else 5.0

class ChunkUploadTracker:
    def __init__(self, total_chunks, total_size, network_speed):
        self.total_chunks = total_chunks
        self.total_size = total_size
        self.network_speed = network_speed
        self.completed_chunks = 0
        self.completed_bytes = 0
        self.start_times = {}
        self.durations = []
        self.speeds = []
        self.lock = threading.Lock()
        self.start_time = time.time()
    
    def start_chunk(self, chunk_number):
        self.start_times[chunk_number] = time.time()
    
    def complete_chunk(self, chunk_number, chunk_size):
        with self.lock:
            duration = time.time() - self.start_times[chunk_number]
            self.durations.append(duration)
            self.completed_chunks += 1
            self.completed_bytes += chunk_size
            speed = chunk_size / duration / (1024 * 1024)
            self.speeds.append(speed)
            completed = self.completed_chunks
            total = self.total_chunks
            avg_speed = sum(self.speeds[-3:]) / min(len(self.speeds), 3)
            progress = (self.completed_bytes / self.total_size) * 100
            remaining_bytes = self.total_size - self.completed_bytes
            eta = remaining_bytes / (avg_speed * 1024 * 1024) if avg_speed > 0 else 0
            print(f"📈 Progress: {progress:.1f}% ({completed}/{total} chunks) Speed: {speed:.2f}MB/s (avg: {avg_speed:.2f}MB/s) ETA: {eta:.1f}s", end='\r')

class ParallelS3Manager(S3Manager):
    def __init__(self, max_workers=None):
        super().__init__()
        cpu_count = os.cpu_count() or 2
        self.max_workers = max_workers or min(cpu_count, 4)
        self.min_chunk_size = 5 * 1024 * 1024
        self.max_chunk_size = 15 * 1024 * 1024
        self.max_chunks = 10000
        self.chunk_buffer = 2 * 1024 * 1024
        self.connection_timeout = 30
        self.read_timeout = 30
        self.config = self.s3_client._client_config
        self.config.retries = {'max_attempts': 3}
        self.config.connect_timeout = self.connection_timeout
        self.config.read_timeout = self.read_timeout

    def _calculate_optimal_params(self, file_size, network_speed):
        measured_throughput = network_speed
        target_chunk_time = 3
        base_chunk_size = int(measured_throughput * 1024 * 1024 * target_chunk_time)
        
        if file_size < 50 * 1024 * 1024:
            target_chunks = 4
        elif file_size < 100 * 1024 * 1024:
            target_chunks = 6
        else:
            target_chunks = 8
        
        chunk_size = max(min(file_size // target_chunks, self.max_chunk_size), self.min_chunk_size)
        chunk_size = (chunk_size // (1024 * 1024)) * 1024 * 1024
        chunk_count = math.ceil(file_size / chunk_size)
        optimal_workers = min(chunk_count, max(int(network_speed / 2), 2))
        worker_count = min(optimal_workers, self.max_workers)
        
        return chunk_size, worker_count

    def _upload_chunk(self, args):
        file_path, chunk, upload_id, part_number, tracker = args
        retries = 3
        backoff_base = 1.5
        
        for attempt in range(retries):
            try:
                tracker.start_chunk(part_number)
                with open(file_path, 'rb') as f:
                    f.seek(chunk['start'])
                    data = bytearray(chunk['size'])
                    bytes_read = 0
                    while bytes_read < chunk['size']:
                        buffer_size = min(self.chunk_buffer, chunk['size'] - bytes_read)
                        bytes_read += f.readinto(memoryview(data)[bytes_read:bytes_read + buffer_size])
                    
                    response = self.s3_client.upload_part(
                        Bucket=self.bucket_name,
                        Key=os.path.basename(file_path),
                        UploadId=upload_id,
                        PartNumber=part_number,
                        Body=data
                    )
                    
                    tracker.complete_chunk(part_number, chunk['size'])
                    return {
                        'PartNumber': part_number,
                        'ETag': response['ETag']
                    }
            except Exception as e:
                if attempt < retries - 1:
                    delay = backoff_base ** attempt
                    print(f"\n⚠️  Retry {attempt + 1}/{retries} for part {part_number} in {delay:.1f}s")
                    time.sleep(delay)
                else:
                    print(f"\n❌ Error uploading part {part_number}: {str(e)}")
                    raise

    def upload_large_file(self, file_path, metadata):
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        file_size = os.path.getsize(file_path)
        if file_size < self.min_chunk_size:
            return self.upload_file(file_path, metadata)

        upload_id = None
        try:
            print(f"\n📡 Testing network speed...")
            speed_test = NetworkSpeedTest(self.s3_client, self.bucket_name)
            network_speed = speed_test.measure_speed()
            print(f"📊 Network speed: {network_speed:.2f}MB/s")
            
            chunk_size, worker_count = self._calculate_optimal_params(file_size, network_speed)
            chunks = []
            offset = 0
            while offset < file_size:
                chunks.append({
                    'start': offset,
                    'size': min(chunk_size, file_size - offset)
                })
                offset += chunk_size
            
            chunk_count = len(chunks)
            print(f"\n📦 Initiating multipart upload for {file_size/1024/1024:.1f}MB file")
            print(f"🔄 Using {chunk_count} chunks of {chunk_size/1024/1024:.1f}MB each")
            print(f"👥 Using {worker_count} parallel workers")
            
            response = self.s3_client.create_multipart_upload(
                Bucket=self.bucket_name,
                Key=os.path.basename(file_path),
                Metadata=metadata
            )
            upload_id = response['UploadId']
            
            tracker = ChunkUploadTracker(chunk_count, file_size, network_speed)
            upload_args = [
                (file_path, chunk, upload_id, idx + 1, tracker)
                for idx, chunk in enumerate(chunks)
            ]
            
            parts = []
            with concurrent.futures.ThreadPoolExecutor(max_workers=worker_count) as executor:
                futures = [executor.submit(self._upload_chunk, args) for args in upload_args]
                for future in concurrent.futures.as_completed(futures):
                    parts.append(future.result())
            
            print("\n✅ All chunks uploaded successfully")
            parts.sort(key=lambda x: x['PartNumber'])
            
            print("🔄 Completing multipart upload...")
            self.s3_client.complete_multipart_upload(
                Bucket=self.bucket_name,
                Key=os.path.basename(file_path),
                UploadId=upload_id,
                MultipartUpload={'Parts': parts}
            )
            
            total_time = time.time() - tracker.start_time
            throughput = (file_size / 1024 / 1024) / total_time
            avg_chunk_speed = sum(tracker.speeds) / len(tracker.speeds)
            print(f"📊 Average chunk speed: {avg_chunk_speed:.2f}MB/s")
            print(f"📈 Overall throughput: {throughput:.2f}MB/s")
            print("✨ Upload complete!")
            return True
            
        except Exception as e:
            print(f"\n❌ Error during parallel upload: {str(e)}")
            if upload_id:
                print("🧹 Cleaning up failed upload...")
                self.s3_client.abort_multipart_upload(
                    Bucket=self.bucket_name,
                    Key=os.path.basename(file_path),
                    UploadId=upload_id
                )
            return False
