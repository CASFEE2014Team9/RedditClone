
/*jslint browser: true*/
/*global window, requirejs, define */

define(function defineController(require) {
    'use strict';

    function DefaultController() {
    }

    var Context = require('Context');
    var context = new Context();
    context.getCategories();
    context.getPosts();

    DefaultController.prototype.get = function getDefault(req, res, next) {
        res.render('home', context);
    };

    return DefaultController;
});