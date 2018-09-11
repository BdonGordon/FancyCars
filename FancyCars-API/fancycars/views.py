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
        #for the image, we will create an array of images that are stored in Django with the names: "http://myfancycar/imageX", where X = a number
        carOne = CreateCars(1, "img1", "pame1", "make1", "model1", 1990, "In Dealership")
        carTwo = CreateCars(2, "img2", "aame2", "make2", "model2", 1999, "Out of Stock")
        carThree = CreateCars(5, "img5", "lame2", "make3", "model2", 1999, "Unavailable")
        carFour = CreateCars(6, "img6", "mame2", "make4", "model2", 1999, "Out of Stock")
        carFive = CreateCars(3, "img3", "oame2", "make5", "model2", 1999, "Unavailable")
        carSix = CreateCars(4, "img4", "bame2", "make6", "model2", 1999, "In Dealership")
        

        cars.append(carOne.createCarObject())
        cars.append(carTwo.createCarObject())
        cars.append(carThree.createCarObject())
        cars.append(carFour.createCarObject())
        cars.append(carFive.createCarObject())
        cars.append(carSix.createCarObject())

        response = JsonResponse({'cars': cars})

        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Credentials"] = True
        response["Access-Control-Allow-Methods"] = "GET,HEAD,OPTIONS,POST,PUT"
        response["Access-Control-Allow-Headers"] =  "*"

        return response


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

