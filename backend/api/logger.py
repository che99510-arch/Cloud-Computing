"""Simple in-memory log store — initialised at startup."""
from datetime import datetime, timezone

_logs = []


def add_log(level: str, message: str):
    _logs.append({
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "level": level,
        "message": message,
    })


def get_logs():
    return list(_logs[-100:])


# Startup entries
add_log("info", "Application Started")
add_log("info", "Deployment Successful")
add_log("info", "Health Check Passed")
