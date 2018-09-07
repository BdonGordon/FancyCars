var API = require('api-stub');

let availability = [{
    path: '/availability?id=',
    data: { status: true }
}];

var server = new API(availability);
server.start(3000);