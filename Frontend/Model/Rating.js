'use strict';

/*jslint browser: true*/
/*global window, requirejs, define */

define(function (require) {

    var Guard = require("Guard");

    function Rating(context, creator, post, value) {

        var Context = require("Context");
        var User = require("User");
        var Post = require("Post");

        Guard.customType(context, "context", Context);
        Guard.customType(creator, "creator", User);
        Guard.customType(post, "post", Post);

        this.context = context;
        this.value = value;
        this.post = post;
        this.creator = creator;

        this.post.ratings.push(this);
        this.post.display();
    }

    Rating.prototype.delete = function () {
        this.post.ratings.removeItem(this);
    };

    return Rating;
});
