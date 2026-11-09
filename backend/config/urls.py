from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    # All API endpoints
    path('', include('api.urls')),

    # Catch-all: serve React's index.html for any non-API route
    # This lets React Router handle /members, /deployment, etc.
    re_path(r'^(?!api/).*$', TemplateView.as_view(template_name='index.html')),
]
