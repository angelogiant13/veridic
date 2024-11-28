import os
import time
from s3_parallel import ParallelS3Manager
from performance_config import PERFORMANCE_THRESHOLDS

def test_parallel_upload():
    print("\n🚀 Testing Parallel Upload")
    print("=" * 40)
    
    # Create a larger test file (50MB)
    filename = "large_test_parallel.pdf"
    size = 50 * 1024 * 1024  # 50MB
    
    try:
        print(f"\n📁 Creating {size/1024/1024:.1f}MB test file...")
        with open(filename, "wb") as f:
            f.write(os.urandom(size))  # Use random data
        
        s3_manager = ParallelS3Manager(max_workers=10)
        
        print("\n⬆️  Testing standard upload...")
        start = time.time()
        success = s3_manager.upload_file(filename, {"test": "metadata"})
        standard_duration = time.time() - start
        threshold = PERFORMANCE_THRESHOLDS["upload_large"]["optimal"]
        status = "✅" if standard_duration <= threshold else "⚠️" if standard_duration <= threshold * 2 else "🚨"
        print(f"📊 Standard upload: {standard_duration:.3f}s {status}")
        
        print("\n⬆️  Testing parallel upload...")
        start = time.time()
        success = s3_manager.upload_large_file(filename, {"test": "metadata"})
        parallel_duration = time.time() - start
        threshold = PERFORMANCE_THRESHOLDS["parallel_upload"]["optimal"]
        status = "✅" if parallel_duration <= threshold else "⚠️" if parallel_duration <= threshold * 2 else "🚨"
        print(f"📊 Parallel upload: {parallel_duration:.3f}s {status}")
        
        improvement = ((standard_duration - parallel_duration) / standard_duration) * 100
        print(f"\n📈 Performance improvement: {improvement:.1f}%")
        
    finally:
        if os.path.exists(filename):
            os.remove(filename)

if __name__ == "__main__":
    test_parallel_upload()
