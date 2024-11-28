from enum import Enum

class PerformanceLevel(Enum):
    OPTIMAL = "✅"
    WARNING = "⚠️"
    CRITICAL = "��"

PERFORMANCE_THRESHOLDS = {
    "presigned_url": {
        "optimal": 0.100,
        "warning": 0.300,
        "critical": 0.500
    },
    "upload_small": {
        "optimal": 0.300,
        "warning": 0.500,
        "critical": 1.000
    },
    "upload_medium": {
        "optimal": 0.500,
        "warning": 1.000,
        "critical": 2.000
    },
    "upload_large": {
        "optimal": 1.000,
        "warning": 2.000,
        "critical": 3.000
    },
    "download_small": {
        "optimal": 0.200,
        "warning": 0.400,
        "critical": 0.800
    },
    "download_medium": {
        "optimal": 0.300,
        "warning": 0.600,
        "critical": 1.200
    },
    "download_large": {
        "optimal": 0.500,
        "warning": 1.000,
        "critical": 2.000
    },
    "list": {
        "optimal": 0.100,
        "warning": 0.300,
        "critical": 0.500
    },
    "delete_small": {
        "optimal": 0.100,
        "warning": 0.300,
        "critical": 0.500
    },
    "delete_medium": {
        "optimal": 0.100,
        "warning": 0.300,
        "critical": 0.500
    },
    "delete_large": {
        "optimal": 0.100,
        "warning": 0.300,
        "critical": 0.500
    },
    "parallel_upload": {
        "optimal": 2.000,
        "warning": 4.000,
        "critical": 6.000
    }
}
