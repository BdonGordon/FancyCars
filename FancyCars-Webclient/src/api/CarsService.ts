//https://www.npmjs.com/package/api-stub
var API = require('api-stub');

let cars = [{
    path: '/availability?id=',
    data: { status: true }
}];

//could create a class/ function to export server or availability
var server = new API(cars);
server.start(3000);