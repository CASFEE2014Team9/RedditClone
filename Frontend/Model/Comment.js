
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function defineComment(require) {
    'use strict';
    var Guard = require("Guard");

    var ids = 0;

    function Comment(context, creator, post, commentText) {

        var Context = require("Context");
        var User = require("User");
        var Post = require("Post");

        Guard.customType(context, "context", Context);
        Guard.customType(creator, "creator", User);
        Guard.customType(post, "post", Post);
        Guard.string(commentText, "commentText");

        this.id = ids;
        ids = ids + 1;
        this.context = context;
        this.text = commentText;
        this.post = post;
        this.creator = creator;
    }

    return Comment;
});