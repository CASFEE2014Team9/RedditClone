
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function defineCategory(require) {
    'use strict';
    var Guard = require("Guard");
   // var $ = require("jquery");

    var ids = 0;

    function Category(context, name) {
        var Context = require("Context");

        Guard.customType(context, "context", Context);
        Guard.string(name, "name");

        this.id = ids;
        ids = ids + 1;
        this.context = context;
        this.name = name;
        this.posts = [];
    }

    Category.prototype.display = function () {

        /*

        if (this.htmlNode === null) {
            var categoryNode = $("<li/>")
                .text(this.name);

            this.htmlNode = categoryNode;
            this.context.categoryTableNode.append(categoryNode);
        }
        */
    };

    return Category;
});