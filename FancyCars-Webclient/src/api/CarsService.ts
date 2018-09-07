//https://www.npmjs.com/package/api-stub
var API = require('api-stub');


function getIt(carID?) {
    let pathType = !!carID ? '/availability?id=' + carID : '/cars';

    let cars = [{
        path: pathType,
        data: { status: true }
    }];

    return cars;
}

//let cars = [{
//    path: '/availability?id=',
//    data: { status: true }
//}];

//could create a class/ function to export server or availability
var server = new API(getIt());
server.start(3000);