from . import views
from django.urls import path


urlpatterns = [
    path('', views.index, name='index'),
    path('cars', views.CarsService.as_view(), name='cars'),
    path('availability/id=<int:id>', views.AvailabilityService.as_view(), name="availability")
]