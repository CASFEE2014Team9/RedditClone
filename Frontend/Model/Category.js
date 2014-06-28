
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function defineCategory(require) {
    'use strict';
    var Guard = require("Guard");
    var $ = require("jquery");

    function Category(context, name) {
        var Context = require("Context");

        Guard.customType(context, "context", Context);
        Guard.string(name, "name");

        this.context = context;
        this.name = name;
        this.htmlNode = null;
        this.posts = [];

        this.display();
    }

    Category.prototype.display = function () {
        if (this.htmlNode === null) {
            var categoryNode = $("<li/>")
                .text(this.name);

            this.htmlNode = categoryNode;
            this.context.categoryTableNode.append(categoryNode);
        }
    };

    return Category;
});