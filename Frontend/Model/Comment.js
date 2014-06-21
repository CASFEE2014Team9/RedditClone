
/*jslint browser: true*/
/*global window, requirejs, define */

define(function (require) {
    'use strict';
    var Guard = require("Guard");
    var $ = require("jquery");

    function Comment(context, creator, post, commentText) {

        var Context = require("Context");
        var User = require("User");
        var Post = require("Post");

        Guard.customType(context, "context", Context);
        Guard.customType(creator, "creator", User);
        Guard.customType(post, "post", Post);
        Guard.string(commentText, "commentText");

        this.context = context;
        this.text = commentText;
        this.post = post;
        this.creator = creator;
        this.htmlNode = null;

        this.post.comments.push(this);
        this.display();
    }

    Comment.prototype.display = function () {
        if (this.htmlNode === null) {

            var commentNode = $("<li/>")
                .html(this.text);

            var deleteButton = $("<button/>")
                .on({
                    click: $.proxy(this.onDeleteClick, this)
                })
                .html("delete comment");


            commentNode.append(deleteButton);

            this.htmlNode = commentNode;
            this.post.htmlNode.comments.append(this.htmlNode);
        }
    };

    Comment.prototype.onDeleteClick = function () {
        Guard.handleError("DeleteComment", this, function () {
            this.delete();
        });
    };

    Comment.prototype.delete = function () {
        this.htmlNode.remove();
        this.post.comments.removeItem(this);
    };

    return Comment;
});