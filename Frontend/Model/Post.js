
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function definePost(require) {
    'use strict';
    var Guard = require("Guard");
    var List = require("List");
    var $ = require("jquery");

    function Post(context, creator, link, title, description) {

        var Context = require("Context");
        var User = require("User");
        var Rating = require("Rating");
        var Comment = require("Comment");

        Guard.customType(context, "context", Context);
        Guard.customType(creator, "creator", User);
        Guard.string(link, "link");
        title = Guard.stringFallback(title, "title", link);
        description = Guard.stringFallback(description, "description", "no description");

        this.context = context;
        this.creator = creator;
        this.url = link;
        this.title = title;
        this.description = description;
        this.comments = new List(Comment);
        this.ratings = new List(Rating);
        this.totalRating = 0;
        this.htmlNode = null;

        this.display();
    }

    Post.prototype.display = function display() {
        if (this.htmlNode === null) {
            var postNode = $("<li/>")
                .addClass("post");

            var title = $("<a/>")
                .attr("href", this.url)
                .html(this.title);

            var description = $("<p>")
                .text(this.description);

            var voteUp = $("<button/>")
                .on({
                    click: $.proxy(this.onVoteUpClick, this)
                })
                .html("vote up");

            var voteDown = $("<button/>")
                .on({
                    click: $.proxy(this.onVoteDownClick, this)
                })
                .html("vote down");

            var deleteButton = $("<button/>")
                .on({
                    click: $.proxy(this.onDeleteClick, this)
                })
                .html("delete post");

            var addCommentButton = $("<button/>")
                .on({
                    click: $.proxy(this.onAddCommentClick, this)
                })
                .html("add comment");

            var commentInput = $("<input/>")
                .attr("type", "text")
                .attr("name", "commentInput");

            var rating = $("<div/>")
                .addClass("postRating");
            var content = $("<div/>")
                .addClass("postContent");
            var detail = $("<div/>")
                .addClass("postDetail");
            var header = $("<header>");

            var comments = $("<div/>")
                .addClass("postComments");

            header.append(title);
            postNode.append(header);

            rating.append(voteUp);
            rating.append(voteDown);
            postNode.append(rating);


            detail.append(description);
            detail.append(deleteButton);
            detail.append(commentInput);
            detail.append(addCommentButton);

            content.append(rating);
            content.append(detail);

            postNode.append(content);
            postNode.append(comments);

            this.htmlNode = postNode;
            this.htmlNode.commentInput = commentInput;
            this.htmlNode.comments = comments;
            this.htmlNode.deleteButton = deleteButton;

            this.context.postTableNode.append(this.htmlNode);
        }

        this.comments.items.forEach(function (comment) {
            comment.display();
        });
    };

    Post.prototype.onAddCommentClick = function onAddCommentClick() {
        Guard.handleError(this, function addComment(item) {
            var Comment = require("Comment");
            var commentText = item.htmlNode.commentInput.val();
            item.addComment(new Comment(item.context, item.context.user, item, commentText));
        });
    };

    Post.prototype.onDeleteClick = function onDeleteClick() {
        Guard.handleError(this, function removePost(item) {
            item.context.removePost(item);
        });
    };

    Post.prototype.onVoteUpClick = function onVoteUpClick() {
        Guard.handleError(this, function voteUp(item) {
            var Rating = require("Rating");
            item.addRating(new Rating(item.context, item.context.user, item, 1));
        });
    };

    Post.prototype.onVoteDownClick = function onVoteDownClick() {
        Guard.handleError(this, function voteDown(item) {
            var Rating = require("Rating");
            item.addRating(new Rating(item.context, item.context.user, item, -1));
        });
    };

    Post.prototype.addComment = function addComment(commment) {
        this.comments.add(commment);
    };

    Post.prototype.removeComment = function removeComment(commment) {
        commment.htmlNode.remove();
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