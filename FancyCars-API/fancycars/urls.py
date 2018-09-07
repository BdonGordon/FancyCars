from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),
    path('cars', views.CarsService.as_view(), name='cars'),
]