module.exports = function createRoutes(app) {
    'use strict';

    var defaultController = require("./Controller/default");
    var fs = require("fs");
    var mime = require("mime");
    var dir = __dirname;

    // the single page app
    app.route('/')
        .get(defaultController.get);

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
