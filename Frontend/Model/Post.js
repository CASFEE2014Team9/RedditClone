
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function definePost(require) {
    'use strict';
    var Guard = require("Guard");
    var List = require("List");

    var ids = 0;

    function Post(context, creator, link, title, description) {

        var Rating = require("Rating");
        var Comment = require("Comment");

        this.id = ids;
        ids = ids + 1;
        this.context = context;
        this.creator = creator;
        this.url = link;
        this.title = title;
        this.description = description;
        this.comments = new List(Comment);
        this.ratings = new List(Rating);
        this.totalRating = 0;
        this.isEditing = false;
    }

    Post.prototype.validate = function validatePost() {
        var Context = require("Context");
        var User = require("User");

        Guard.customType(this.context, "context", Context);
        Guard.customType(this.creator, "creator", User);
        Guard.string(this.url, "url");
        this.title = Guard.stringFallback(this.title, "title", this.url);
        this.description = Guard.stringFallback(this.description, "description", "no description");
    };

    Post.prototype.addComment = function addComment(commment) {
        this.comments.add(commment);
    };

    Post.prototype.removeComment = function removeComment(commment) {
        this.comments.remove(commment);
    };

    Post.prototype.addRating = function addRating(rating) {
        this.ratings.add(rating);

        var Enumerable = require("linqjs");
        this.totalRating = Enumerable.From(this.ratings.items).Select(function (rating) { return rating.value; }).Sum();
    };

    Post.prototype.removeRating = function removeRating(rating) {
        this.ratings.remove(rating);
    };

    return Post;
});