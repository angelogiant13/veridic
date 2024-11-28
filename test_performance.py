import os
import time
import csv
import statistics
from datetime import datetime
import boto3
from botocore.exceptions import ClientError
from s3_setup import S3Manager, UploadError
from performance_config import PerformanceLevel, PERFORMANCE_THRESHOLDS
from performance_monitor import PerformanceMonitor

def run_single_test(s3_manager, operation, file_info=None):
    start = time.time()
    success = True
    
    try:
        if operation == "presigned_url":
            s3_manager.generate_presigned_url(file_info[0])
        elif operation.startswith("upload_"):
            s3_manager.upload_file(file_info[0], {"test": "metadata"})
        elif operation.startswith("download_"):
            s3_manager.download_file(file_info[0], f"downloaded_{file_info[0]}")
        elif operation == "list":
            s3_manager.list_files()
        elif operation.startswith("delete_"):
            s3_manager.delete_file(file_info[0])
    except Exception as e:
        print(f"Error in {operation}: {str(e)}")
        success = False
    
    duration = time.time() - start
    return success, duration

def run_performance_tests(iterations=2):
    s3_manager = S3Manager()
    monitor = PerformanceMonitor()
    
    print("\n🚀 Starting Performance Tests")
    print("=" * 40)

    test_files = {
        "small": ("test_small.pdf", 1024),
        "medium": ("test_medium.pdf", 1024*100),
        "large": ("test_large.pdf", 1024*1024)
    }
    
    print("\n📁 Creating test files...")
    for name, (filename, size) in test_files.items():
        with open(filename, "w") as f:
            f.write("x" * size)
    
    try:
        operations = [
            ("presigned_url", test_files["small"]),
            *[(f"upload_{size}", file_info) for size, file_info in test_files.items()],
            *[(f"download_{size}", file_info) for size, file_info in test_files.items()],
            ("list", None),
            *[(f"delete_{size}", file_info) for size, file_info in test_files.items()]
        ]
        
        results = {}
        for operation, file_info in operations:
            print(f"\n�� Testing {operation}")
            print("-" * 40)
            
            operation_results = []
            for i in range(iterations):
                success, duration = run_single_test(s3_manager, operation, file_info)
                if success:
                    operation_results.append(duration)
                    threshold = PERFORMANCE_THRESHOLDS.get(operation, {}).get('optimal', 0)
                    status = "✅" if duration <= threshold else "⚠️" if duration <= threshold * 2 else "🚨"
                    print(f"📊 {operation}: {duration:.3f}s {status} (threshold: {threshold:.3f}s)")
            
            if operation_results:
                results[operation] = {
                    'min': min(operation_results),
                    'max': max(operation_results),
                    'avg': sum(operation_results) / len(operation_results)
                }
    
    finally:
        print("\n🧹 Cleaning up test files...")
        for _, (filename, _) in test_files.items():
            if os.path.exists(filename):
                os.remove(filename)
            if os.path.exists(f"downloaded_{filename}"):
                os.remove(f"downloaded_{filename}")
        
        print("\n📈 Performance Summary")
        print("=" * 40)
        for operation, stats in results.items():
            threshold = PERFORMANCE_THRESHOLDS.get(operation, {}).get('optimal', 0)
            status = "✅" if stats['avg'] <= threshold else "⚠️" if stats['avg'] <= threshold * 2 else "🚨"
            print(f"{operation}:")
            print(f"  {status} Avg: {stats['avg']:.3f}s (threshold: {threshold:.3f}s)")
            print(f"  └─ Min: {stats['min']:.3f}s, Max: {stats['max']:.3f}s")
        
        export_results(results)
        return results

def export_results(results):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    os.makedirs("test_results", exist_ok=True)
    
    csv_file = f"test_results/s3_performance_benchmarks_{timestamp}.csv"
    with open(csv_file, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Operation", "Min (s)", "Max (s)", "Avg (s)", "Threshold (s)", "Status"])
        
        for operation, stats in results.items():
            threshold = PERFORMANCE_THRESHOLDS.get(operation, {}).get('optimal', 0)
            status = "✅" if stats['avg'] <= threshold else "⚠️" if stats['avg'] <= threshold * 2 else "🚨"
            writer.writerow([
                operation,
                f"{stats['min']:.3f}",
                f"{stats['max']:.3f}",
                f"{stats['avg']:.3f}",
                f"{threshold:.3f}",
                status
            ])
    
    print(f"\n📊 Results exported to: {csv_file}")

if __name__ == "__main__":
    try:
        run_performance_tests()
    except Exception as e:
        print(f"\n❌ Error during performance testing: {str(e)}")
