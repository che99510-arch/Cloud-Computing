from django.urls import path
from . import views

urlpatterns = [
    path('',          views.index,   name='index'),
    path('members',   views.members, name='members'),
    path('health',    views.health,  name='health'),
    path('config',    views.config,  name='config'),
    path('logs',      views.logs,    name='logs'),
]
