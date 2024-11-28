import os
import time
import csv
from datetime import datetime
import boto3
from botocore.exceptions import ClientError
from s3_setup import S3Manager, UploadError

class TestMetrics:
    def __init__(self):
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        self.test_times = {}
        self.errors = []
        self.start_time = None
        self.total_time = 0
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    def start_test_suite(self):
        self.start_time = time.time()
    
    def end_test_suite(self):
        self.total_time = time.time() - self.start_time
    
    def add_test_result(self, test_name, passed, duration, error_msg=None):
        self.total_tests += 1
        self.test_times[test_name] = duration
        if passed:
            self.passed_tests += 1
        else:
            self.failed_tests += 1
            if error_msg:
                self.errors.append(f"{test_name}: {error_msg}")
    
    def export_results(self):
        # Create results directory if it doesn't exist
        os.makedirs("test_results", exist_ok=True)
        
        # Generate filename with timestamp
        filename = f"test_results/s3_tests_{self.timestamp}.csv"
        
        # Write results to CSV
        with open(filename, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["Test Name", "Status", "Duration (s)", "Error"])
            
            for test_name, duration in self.test_times.items():
                error = next((err.split(": ", 1)[1] for err in self.errors if err.startswith(test_name)), "")
                status = "PASS" if not error else "FAIL"
                writer.writerow([test_name, status, f"{duration:.2f}", error])
        
        print(f"\nResults exported to: {filename}")
        
        # Generate summary
        with open(f"test_results/summary_{self.timestamp}.txt", "w") as f:
            f.write("TEST EXECUTION SUMMARY\n")
            f.write("=" * 20 + "\n")
            f.write(f"Total Tests: {self.total_tests}\n")
            f.write(f"Passed: {self.passed_tests}\n")
            f.write(f"Failed: {self.failed_tests}\n")
            f.write(f"Total Time: {self.total_time:.2f}s\n")
            f.write(f"Success Rate: {(self.passed_tests/self.total_tests*100):.1f}%\n")
            
            if self.errors:
                f.write("\nErrors:\n")
                for error in self.errors:
                    f.write(f"- {error}\n")
        
        print(f"Summary exported to: test_results/summary_{self.timestamp}.txt")

def run_test(test_name, test_function, metrics):
    print(f"\nRunning: {test_name}")
    print("-" * (len(test_name) + 9))
    start_time = time.time()
    try:
        test_function()
        duration = time.time() - start_time
        metrics.add_test_result(test_name, True, duration)
        print("✅ Test completed successfully")
    except Exception as e:
        duration = time.time() - start_time
        metrics.add_test_result(test_name, False, duration, str(e))
        print(f"❌ Test caught error: {str(e)}")

def test_error_scenarios():
    s3_manager = S3Manager()
    metrics = TestMetrics()
    metrics.start_test_suite()
    
    def test_nonexistent_file():
        result = s3_manager.upload_file("non_existent.pdf", {"test": "metadata"})
        assert result == False
    
    def test_invalid_filetype():
        with open("test.invalid", "w") as f:
            f.write("test content")
        try:
            result = s3_manager.upload_file("test.invalid", {"test": "metadata"})
            assert result == False
        finally:
            if os.path.exists("test.invalid"):
                os.remove("test.invalid")
    
    def test_invalid_metadata():
        with open("test.pdf", "w") as f:
            f.write("test content")
        try:
            result = s3_manager.upload_file("test.pdf", {"invalid": None})
            assert result == False
        finally:
            if os.path.exists("test.pdf"):
                os.remove("test.pdf")
    
    def test_network_failure():
        with open("test_network.pdf", "w") as f:
            f.write("test content")
        try:
            def mock_generate_url(*args, **kwargs):
                raise ClientError(
                    {"Error": {"Code": "NetworkFailure", "Message": "Network connection failed"}},
                    "generate_presigned_url"
                )
            original_method = s3_manager.s3_client.generate_presigned_url
            s3_manager.s3_client.generate_presigned_url = mock_generate_url
            result = s3_manager.upload_file("test_network.pdf", {"test": "metadata"})
            assert result == False, "Should fail with network error"
        finally:
            s3_manager.s3_client.generate_presigned_url = original_method
            if os.path.exists("test_network.pdf"):
                os.remove("test_network.pdf")
    
    def test_large_file():
        with open("large_test.pdf", "w") as f:
            f.write("x" * 1024 * 1024)
        try:
            result = s3_manager.upload_file("large_test.pdf", {"test": "metadata"})
            assert result == True, "Large file upload should succeed"
        finally:
            if os.path.exists("large_test.pdf"):
                os.remove("large_test.pdf")
    
    print("Starting individual tests...")
    run_test("Non-existent file upload", test_nonexistent_file, metrics)
    run_test("Invalid file type", test_invalid_filetype, metrics)
    run_test("Invalid metadata", test_invalid_metadata, metrics)
    run_test("Network failure simulation", test_network_failure, metrics)
    run_test("Large file upload", test_large_file, metrics)
    
    metrics.end_test_suite()
    return metrics

if __name__ == "__main__":
    print("Starting error handling tests...")
    try:
        metrics = test_error_scenarios()
        metrics.export_results()
    except Exception as e:
        print(f"Unexpected error during testing: {str(e)}")
