import boto3
import botocore
from botocore.exceptions import ClientError
import mimetypes
import os
import json
import subprocess
import time

class S3Manager:
    def __init__(self, region="us-east-1"):
        self.s3_client = boto3.client("s3", region_name=region)
        self.region = region
        self.bucket_name = "veridic-uploads"
        self.allowed_types = {
            ".pdf": "application/pdf",
            ".doc": "application/msword",
            ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".txt": "text/plain",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png"
        }

    def validate_file_type(self, file_path):
        file_ext = os.path.splitext(file_path)[1].lower()
        if file_ext not in self.allowed_types:
            print(f"Error: File type {file_ext} not allowed")
            print("Allowed types: " + ", ".join(self.allowed_types.keys()))
            return False
        return True

    def generate_presigned_url(self, file_name, metadata=None, expiration=900):
        if not self.validate_file_type(file_name):
            return None, None
            
        try:
            content_type = self.allowed_types[os.path.splitext(file_name)[1].lower()]
            params = {
                "Bucket": self.bucket_name,
                "Key": file_name,
                "ContentType": content_type
            }
            
            if metadata:
                params["Metadata"] = metadata
            
            url = self.s3_client.generate_presigned_url(
                "put_object",
                Params=params,
                ExpiresIn=expiration
            )
            return url, content_type
        except ClientError as e:
            print(f"Error generating presigned URL: {e}")
            return None, None

    def get_metadata(self, file_key):
        try:
            response = self.s3_client.head_object(
                Bucket=self.bucket_name,
                Key=file_key
            )
            return {
                "metadata": response.get("Metadata", {}),
                "content_type": response.get("ContentType", ""),
                "size": response.get("ContentLength", 0),
                "last_modified": response.get("LastModified", "")
            }
        except ClientError as e:
            print(f"Error getting metadata: {e}")
            return None

def main():
    s3_manager = S3Manager()
    
    test_metadata = {
        "author": "John Doe",
        "department": "Legal",
        "version": "1.0"
    }
    
    print("Generating presigned URL with metadata...")
    url, content_type = s3_manager.generate_presigned_url("test-meta.pdf", metadata=test_metadata)
    if url and content_type:
        print("URL generated successfully")
        with open("test-meta.pdf", "w") as f:
            f.write("Test content")
        
        cmd = [
            "curl",
            "-X", "PUT",
            "-T", "test-meta.pdf"
        ]
        
        for key, value in test_metadata.items():
            cmd.extend(["-H", f"x-amz-meta-{key}:{value}"])
        
        cmd.extend(["-H", f"Content-Type:{content_type}"])
        cmd.append(url)
        
        print("Uploading file with metadata...")
        print("Running command: " + " ".join(cmd))
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print("Upload successful")
            print("Waiting for S3 to process the upload...")
            time.sleep(2)
            
            print("Retrieving file metadata:")
            metadata = s3_manager.get_metadata("test-meta.pdf")
            if metadata:
                print("File details:")
                print("-------------")
                content_type = metadata.get("content_type", "Not available")
                size = metadata.get("size", 0)
                last_modified = metadata.get("last_modified", "Not available")
                
                print(f"Content Type: {content_type}")
                print(f"Size: {size} bytes")
                print(f"Last Modified: {last_modified}")
                print("Custom Metadata:")
                print("--------------")
                for key, value in metadata.get("metadata", {}).items():
                    print(f"{key}: {value}")
            else:
                print("Failed to retrieve metadata")
        else:
            print("Upload failed:")
            print(result.stderr)

if __name__ == "__main__":
    main()
