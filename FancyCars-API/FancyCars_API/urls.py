"""
Definition of urls for FancyCars_API.
"""

from django.contrib import admin
from datetime import datetime
from django.conf.urls import url
import django.contrib.auth.views
from django.urls import path, include

# Uncomment the next lines to enable the admin:
# from django.conf.urls import include
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    path('fancycars/', include('fancycars.urls')),
    path('admin/', admin.site.urls),
]
