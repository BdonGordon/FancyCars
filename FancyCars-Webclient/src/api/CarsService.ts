//https://www.npmjs.com/package/api-stub
var API = require('api-stub');

//function getIt(carID?) {
//    let pathType = !!carID ? '/availability?id=' + carID : '/cars';

//    let cars = [{
//        path: pathType,
//        data: { status: true }
//    }];

//    return cars;
//}

//let cars = [{
//    path: '/availability?id=',
//    data: { status: true }
//}];

var cars = [{
    path: '/cars',
    data: {
        cars: [{
            id: 1,
            img: 'img',
            name: 'name',
            make: 'make',
            model: 'model',
            year: 1990,
            available: true
        }]
    }
}]

//could create a class/ function to export server or availability
var server = new API(cars);
server.start(8000);