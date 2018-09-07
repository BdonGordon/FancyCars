from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView

# Create your views here.

def index(request):
    return HttpResponse("Hello")

#http://127.0.0.1:8000/fancycars/cars

class CarsService(APIView):
    def get(self, format=None):
        cars = []
        carOne = CreateCars(1, "img1", "name1", "make1", "model1", 1990, "Available")
        carTwo = CreateCars(2, "img2", "name2", "make2", "model2", 1999, "Out of Stock")

        cars.append(carOne.createCarObject())
        cars.append(carTwo.createCarObject())

        return JsonResponse({'cars': cars})


class CreateCars:
    def __init__(self, id, img, name, make, model, year, available):
        self.id = id
        self.img = img
        self.name = name
        self.make = make
        self.model = model
        self.year = year
        self.available = available

    def createCarObject(self):
        car = {'id': self.id, 'img': self.img, 'name': self.name, 'make': self.make, 'model': self.model, 'year': self.year, 'available': self.available}

        return car

