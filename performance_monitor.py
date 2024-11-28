import time
import statistics
from datetime import datetime
from performance_config import PerformanceLevel, PERFORMANCE_THRESHOLDS

class PerformanceMonitor:
    def __init__(self):
        self.measurements = {}
        self.alerts = []
        self.start_time = datetime.now()

    def start_operation(self, operation_name):
        return time.time()

    def end_operation(self, operation_name, start_time):
        duration = time.time() - start_time
        if operation_name not in self.measurements:
            self.measurements[operation_name] = []
        self.measurements[operation_name].append(duration)
        
        self._check_threshold(operation_name, duration)
        return duration

    def _check_threshold(self, operation_name, duration):
        base_operation = operation_name.split('_')[0]
        thresholds = PERFORMANCE_THRESHOLDS.get(operation_name, PERFORMANCE_THRESHOLDS.get(base_operation))
        
        if not thresholds:
            return PerformanceLevel.OPTIMAL
        
        if duration <= thresholds['optimal']:
            level = PerformanceLevel.OPTIMAL
        elif duration <= thresholds['warning']:
            level = PerformanceLevel.WARNING
        else:
            level = PerformanceLevel.CRITICAL
            self._create_alert(operation_name, duration, thresholds)
        
        return level

    def _create_alert(self, operation_name, duration, thresholds):
        alert = {
            'timestamp': datetime.now(),
            'operation': operation_name,
            'duration': duration,
            'threshold': thresholds['critical'],
            'level': PerformanceLevel.CRITICAL
        }
        self.alerts.append(alert)

    def get_stats(self, operation_name):
        if operation_name not in self.measurements:
            return None
        
        durations = self.measurements[operation_name]
        return {
            'min': min(durations),
            'max': max(durations),
            'avg': statistics.mean(durations),
            'median': statistics.median(durations),
            'count': len(durations),
            'level': self._check_threshold(operation_name, statistics.mean(durations))
        }

    def generate_report(self):
        report = []
        report.append("PERFORMANCE REPORT")
        report.append("=" * 50)
        report.append(f"Test Duration: {datetime.now() - self.start_time}")
        report.append("")
        
        for operation in sorted(self.measurements.keys()):
            stats = self.get_stats(operation)
            if stats:
                report.append(f"{operation}:")
                report.append(f"  Status: {stats['level'].value}")
                report.append(f"  Average: {stats['avg']:.3f}s")
                report.append(f"  Min/Max: {stats['min']:.3f}s / {stats['max']:.3f}s")
                report.append(f"  Samples: {stats['count']}")
                report.append("")
        
        if self.alerts:
            report.append("ALERTS")
            report.append("=" * 50)
            for alert in self.alerts:
                report.append(f"{alert['timestamp']}: {alert['operation']}")
                report.append(f"  Duration: {alert['duration']:.3f}s")
                report.append(f"  Threshold: {alert['threshold']:.3f}s")
                report.append("")
        
        return "\n".join(report)
