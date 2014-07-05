
define(function (require) {
    'use strict';

    var createRoutes = function createRoutes(app, dir) {

        var DefaultController = require("./Controller/defaultController");
        var fs = require("fs");
        var mime = require("mime");

        var controllerInstance = new DefaultController();

        // the single page app
        app.route('/')
            .get(controllerInstance.get);

        app.route('/default.js')
            .get(function getDefaultJs(req, res, next) {
                res.setHeader("content-type", mime.lookup(dir + "/default.js"));
                fs.createReadStream(dir + "/default.js").pipe(res);
            });

        app.route('/requirejs-config.js')
            .get(function getDefaultJs(req, res, next) {
                res.setHeader("content-type", mime.lookup(dir + "/requirejs-config.js"));
                fs.createReadStream(dir + "/requirejs-config.js").pipe(res);
            });
    };

    return createRoutes;
});