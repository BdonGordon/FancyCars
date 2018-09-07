from django.db import models

# Create your models here.
class Car(models.Model):
    img = models.ImageField(upload_to='cars')
    name = models.CharField(max_length=100)
    make = models.CharField(max_length=80)
    model = models.CharField(max_length=50)
    year = models.BigIntegerField(default=0)
    available = models.CharField(max_length=50)