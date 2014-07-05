
/*jslint browser: true*/
/*global window, requirejs, define */

(function () {
    'use strict';
    function DefaultController() {}

    var fs = require("fs");
    var mime = require("mime");

    DefaultController.get = function getDefault(req, res, next) {
        res.setHeader("content-type", mime.lookup("./Frontend/default.html"));
        fs.createReadStream("./Frontend/default.html").pipe(res);
    };

    module.exports = DefaultController;
}());