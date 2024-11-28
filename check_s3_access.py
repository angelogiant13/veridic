import boto3
from botocore.exceptions import ClientError

def check_s3_access():
    try:
        # Initialize the S3 client
        s3 = boto3.client('s3')
        
        # Get list of buckets to verify credentials
        print("\n🔑 Checking AWS credentials...")
        response = s3.list_buckets()
        print("✅ AWS credentials are valid")
        
        # Print available buckets
        print("\n📦 Available buckets:")
        for bucket in response['Buckets']:
            print(f"- {bucket['Name']}")
        
        # Get the bucket name from environment or input
        bucket_name = input("\nEnter the S3 bucket name to use: ")
        
        # Check bucket permissions
        print(f"\n🔍 Checking permissions for bucket: {bucket_name}")
        
        # Test ListObjects
        print("\nTesting ListObjects...")
        s3.list_objects_v2(Bucket=bucket_name, MaxKeys=1)
        print("✅ Can list objects")
        
        # Test PutObject
        print("\nTesting PutObject...")
        s3.put_object(Bucket=bucket_name, Key='test.txt', Body='test')
        print("✅ Can upload objects")
        
        # Test GetObject
        print("\nTesting GetObject...")
        s3.get_object(Bucket=bucket_name, Key='test.txt')
        print("✅ Can download objects")
        
        # Test DeleteObject
        print("\nTesting DeleteObject...")
        s3.delete_object(Bucket=bucket_name, Key='test.txt')
        print("✅ Can delete objects")
        
        print("\n✨ All permissions verified successfully!")
        return bucket_name
        
    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        print(f"\n❌ Error: {error_code}")
        print(f"Message: {error_message}")
        
        if error_code == 'AccessDenied':
            print("\n📝 Required IAM permissions:")
            print("- s3:ListBucket")
            print("- s3:PutObject")
            print("- s3:GetObject")
            print("- s3:DeleteObject")
            
        return None

if __name__ == "__main__":
    print("🔧 S3 Access Checker")
    print("=" * 40)
    bucket_name = check_s3_access()
    
    if bucket_name:
        print(f"\n📝 Add this to your s3_setup.py:")
        print(f"self.bucket_name = '{bucket_name}'")
