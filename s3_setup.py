import os
import time
import boto3
from botocore.exceptions import ClientError
from botocore.config import Config

class UploadError(Exception):
    pass

class S3Manager:
    def __init__(self):
        config = Config(
            connect_timeout=5,
            read_timeout=5,
            retries={'max_attempts': 3}
        )
        self.s3_client = boto3.client('s3', config=config)
        self.bucket_name = 'veridic-uploads'
        self.max_retries = 3
        self.allowed_types = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png']
    
    def generate_presigned_url(self, file_name, expiration=3600):
        try:
            response = self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket_name, 'Key': file_name},
                ExpiresIn=expiration
            )
            return response
        except ClientError as e:
            print(f"Error generating presigned URL: {str(e)}")
            return None

    def upload_file(self, file_name, metadata, max_retries=3):
        if not os.path.exists(file_name):
            raise FileNotFoundError(f"File not found: {file_name}")
        
        _, file_extension = os.path.splitext(file_name)
        if file_extension.lower() not in self.allowed_types:
            print(f"Error: File type {file_extension} not allowed. "
                  f"Allowed types: {', '.join(self.allowed_types)}")
            return False

        for attempt in range(1, max_retries + 1):
            try:
                print(f"Attempt {attempt} of {max_retries}")
                
                with open(file_name, 'rb') as f:
                    self.s3_client.put_object(
                        Bucket=self.bucket_name,
                        Key=file_name,
                        Body=f,
                        Metadata=metadata
                    )
                
                print("Upload successful")
                return True
                
            except Exception as e:
                print(f"Error during upload (attempt {attempt}): {str(e)}")
                if attempt < max_retries:
                    print(f"Retrying in 2 seconds...")
                    time.sleep(2)
                else:
                    print("Max retries reached. Upload failed.")
                    return False
    
    def download_file(self, file_name, local_path):
        try:
            self.s3_client.download_file(
                self.bucket_name,
                file_name,
                local_path
            )
            return True
        except ClientError as e:
            print(f"Error downloading file: {str(e)}")
            return False
    
    def list_files(self, prefix=''):
        try:
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=prefix
            )
            return [obj['Key'] for obj in response.get('Contents', [])]
        except ClientError as e:
            print(f"Error listing files: {str(e)}")
            return []
    
    def delete_file(self, file_name):
        try:
            self.s3_client.delete_object(
                Bucket=self.bucket_name,
                Key=file_name
            )
            return True
        except ClientError as e:
            print(f"Error deleting file: {str(e)}")
            return False
