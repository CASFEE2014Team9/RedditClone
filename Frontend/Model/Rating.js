
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function defineRating(require) {
    'use strict';
    var Guard = require("Guard");

    var ids = 0;

    function Rating(context, creator, post, value) {

        var Context = require("Context");
        var User = require("User");
        var Post = require("Post");

        Guard.customType(context, "context", Context);
        Guard.customType(creator, "creator", User);
        Guard.customType(post, "post", Post);

        this.id = ids;
        ids = ids + 1;
        this.context = context;
        this.value = value;
        this.post = post;
        this.creator = creator;
    }

    return Rating;
});
