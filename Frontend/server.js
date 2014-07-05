
/*jslint browser: true*/
/*global window, requirejs, define */

(function () {
    'use strict';

    var http = require('http');
    var open = require('open');
    var express = require('express');
    var routes = require('./routes');
    var port = 9000;
    var host = 'localhost';

    var app = express();

    // setup error handling
    app.use(function errorHandler(err, req, res, next) {
        console.error(err.stack);
        res.send(500, err.stack);
    });

    // setup static routes for static stuff
    var dir = __dirname;
    app.use("/css", express.static(dir + '/css/'));
    app.use("/Lib", express.static(dir + '/Lib/'));
    app.use("/Model", express.static(dir + '/Model/'));
    app.use("/style-guide", express.static(dir + '/style-guide/'));
    app.use("/View", express.static(dir + '/View/'));
    app.use("/Tests", express.static(dir + '/Tests/'));

    // setup routes
    routes(app);

    var server = http.createServer(app);
    server.listen(port);
    server.on('listening', function () {
        open('http://' + host + ':' + port);
    });
}());