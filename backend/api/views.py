import os
import sys
import platform
from datetime import datetime, timezone

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .data import MEMBERS
from .logger import add_log, get_logs


@api_view(['GET'])
def index(request):
    add_log("info", "GET /")
    return Response({
        "message": "Cloud Computing Deployment Project API",
        "version": "1.0.0",
        "platform": os.environ.get("PLATFORM", "Google App Engine"),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })


@api_view(['GET'])
def members(request):
    add_log("info", "GET /members")
    return Response({"count": len(MEMBERS), "members": MEMBERS})


@api_view(['GET'])
def health(request):
    add_log("info", "Health check passed")
    import time
    return Response({
        "status": "healthy",
        "platform": os.environ.get("PLATFORM", "Google App Engine"),
        "uptime": round(time.process_time(), 2),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })


@api_view(['GET'])
def config(request):
    add_log("info", "GET /config")
    import django
    return Response({
        "environment": {
            "NODE_ENV":  os.environ.get("NODE_ENV", "production"),   # kept for parity
            "APP_NAME":  os.environ.get("APP_NAME", "Cloud Project"),
            "PLATFORM":  os.environ.get("PLATFORM", "Google App Engine"),
        },
        "dependencies": {
            "python":               sys.version.split()[0],
            "django":               django.__version__,
            "djangorestframework":  "3.15.2",
            "django-cors-headers":  "4.3.1",
            "gunicorn":             "22.0.0",
            "whitenoise":           "6.7.0",
        },
        "runtime": {
            "platform":  platform.system().lower(),
            "arch":      platform.machine(),
            "python":    sys.version.split()[0],
        },
    })


@api_view(['GET'])
def logs(request):
    add_log("info", "GET /logs")
    entries = get_logs()
    return Response({"count": len(entries), "logs": entries})
