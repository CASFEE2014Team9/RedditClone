'use strict';

var connect = require('connect'),
    http = require('http'),
    open = require('open');

// Create static file server on port 9000 and serve "Frontend" directory
var app = connect().use(connect.static("Frontend")),
    server = http.createServer(app).listen(9000);

server.on('listening', function () {
    open('http://localhost:9000/default.html');
});