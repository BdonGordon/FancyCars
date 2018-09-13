from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView

# Create your views here.

def index(request):
    return HttpResponse("Hello")

class CarsService(APIView):
    def get(self, format=None):
        cars = []
        #simply hard code the data for the cars
        carOne = CreateCars(1, "img1", "Mansonry Bentley Bentayga", "Bentley", "Bentayga", 2017, "In Dealership")
        carTwo = CreateCars(2, "img2", "Mercedes-Benz SLR McLaren Roadster", "Mercedes-Benz", "SLR McLaren", 2010, "Out of Stock")
        carThree = CreateCars(5, "img5", "Mercedes-Benz G500 Cabriolet", "Mercedes-Benz", "G500 Cabriolet", 2017, "Unavailable")
        carFour = CreateCars(6, "img6", "Bugatti Veyron 16.4", "Bugatti", "Veyron 16.4", 2008, "Out of Stock")
        carFive = CreateCars(10, "img4", "Ferrari Scuderia 16 M", "Ferrari", "Scuderia 16", 2009, "Unavailable")
        carSix = CreateCars(4, "img10", "LHD Ferrari 458 Speciale", "Ferrari", "458 Speciale", 2014, "In Dealership")
        carSeven = CreateCars(7, "img7", "Lamborghini Aventador LP700-4 LHD", "Lamborghini", "Aventador", 2013, "In Dealership")
        carEight = CreateCars(9, "img9", "Lamborghini Huracan Performante", "Lamborghini", "Huracan Performante", 2017, "Unavailable")
        carNine = CreateCars(8, "img8", "Porsche 911 GT3", "Porsche", "911 GT3", 2014, "In Dealership")
        carTen = CreateCars(3, "img3", "Rolls-Royce Dawn", "Rolls-Royce", "Dawn", 2017, "Out of Stock")
        #create the JSON objects for each car then store into the cars array
        cars.append(carOne.createCarObject())
        cars.append(carTwo.createCarObject())
        cars.append(carThree.createCarObject())
        cars.append(carFour.createCarObject())
        cars.append(carFive.createCarObject())
        cars.append(carSix.createCarObject())
        cars.append(carSeven.createCarObject())
        cars.append(carEight.createCarObject())
        cars.append(carNine.createCarObject())
        cars.append(carTen.createCarObject())

        response = JsonResponse({'cars': cars})

        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Credentials"] = True
        response["Access-Control-Allow-Methods"] = "GET,HEAD,OPTIONS,POST,PUT"
        response["Access-Control-Allow-Headers"] =  "*"

        return response


class AvailabilityService(APIView):
    def get(self, request, id):
        cars = []

        #since we have to "fake" an API response, this list of cars is our "database" that we are looking through
        carOne = CreateCars(1, "img1", "Mansonry Bentley Bentayga", "Bentley", "Bentayga", 2017, "In Dealership")
        carTwo = CreateCars(2, "img2", "Mercedes-Benz SLR McLaren Roadster", "Mercedes-Benz", "SLR McLaren", 2010, "Out of Stock")
        carThree = CreateCars(5, "img3", "Mercedes-Benz G500 Cabriolet", "Mercedes-Benz", "G500 Cabriolet", 2017, "Unavailable")
        carFour = CreateCars(6, "img4", "Bugatti Veyron 16.4", "Bugatti", "Veyron 16.4", 2008, "Out of Stock")
        carFive = CreateCars(10, "img5", "Ferrari Scuderia 16 M", "Ferrari", "Scuderia 16", 2009, "Unavailable")
        carSix = CreateCars(4, "img6", "LHD Ferrari 458 Speciale", "Ferrari", "458 Speciale", 2014, "In Dealership")
        carSeven = CreateCars(7, "img7", "Lamborghini Aventador LP700-4 LHD", "Lamborghini", "Aventador", 2013, "In Dealership")
        carEight = CreateCars(9, "img8", "Lamborghini Huracan Performante", "Lamborghini", "Huracan Performante", 2017, "Unavailable")
        carNine = CreateCars(8, "img9", "Porsche 911 GT3", "Porsche", "911 GT3", 2014, "In Dealership")
        carTen = CreateCars(3, "img10", "Rolls-Royce Dawn", "Rolls-Royce", "Dawg", 2017, "Out of Stock")

        cars.append(carOne.createCarObject())
        cars.append(carTwo.createCarObject())
        cars.append(carThree.createCarObject())
        cars.append(carFour.createCarObject())
        cars.append(carFive.createCarObject())
        cars.append(carSix.createCarObject())
        cars.append(carSeven.createCarObject())
        cars.append(carEight.createCarObject())
        cars.append(carNine.createCarObject())
        cars.append(carTen.createCarObject())

        #find the ID, if it exists, and return the appropriate reponse
        for car in cars:
            if id == car['id']:
                return JsonResponse({'available': car['available']})
            
        return JsonResponse({'available': 'Car does not exist in database'})

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

