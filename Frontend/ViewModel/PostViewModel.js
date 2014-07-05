
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function definePostViewModel(require) {
    'use strict';
    var Guard = require("Guard");
    var $ = require("jquery");

    function PostViewModel(post, contextViewModel, htmlNode) {
        this.post = post;
        this.contextViewModel = contextViewModel;
        this.htmlNode = htmlNode;
    }

    PostViewModel.prototype.display = function display(callback) {
        var item = this;
        require(['hbs!View/post'], function (template) {
            item.htmlNode = $(template(item.post));
            item.contextViewModel.postTableNode.append(item.htmlNode);
            callback();
        });
    };

    PostViewModel.prototype.connectModelWithView = function connectWithModel() {
        this.htmlNode.commentInput = this.htmlNode.find(".postCommentInput");
        this.htmlNode.comments = this.htmlNode.find(".postComments");

        this.htmlNode.find(".postDeleteButton").on({
            click: $.proxy(this.onDeleteClick, this)
        });

        this.htmlNode.find(".postAddCommentButton").on({
            click: $.proxy(this.onAddCommentClick, this)
        });

        this.htmlNode.find(".postRatingVoteUpButton").on({
            click: $.proxy(this.onVoteUpClick, this)
        });

        this.htmlNode.find(".postRatingVoteDownButton").on({
            click: $.proxy(this.onVoteDownClick, this)
        });

        var item = this;
        this.htmlNode.comments.children().each(function () {
            var CommentViewModel = require("CommentViewModel");

            var htmlNode = $(this);
            var dataId = parseInt(htmlNode.attr("data-id"));
            var comment = item.contextViewModel.context.comments.findByKey('id', dataId);
            var commentViewModel = new CommentViewModel(comment, item, htmlNode);
            commentViewModel.connectModelWithView();
        });
    };

    PostViewModel.prototype.onAddCommentClick = function onAddCommentClick() {
        Guard.handleError(this, function addComment(item) {
            var Comment = require("Comment");
            var CommentViewModel = require("CommentViewModel");

            var commentText = item.htmlNode.commentInput.val();
            var comment = new Comment(item.contextViewModel.context, item.contextViewModel.userViewModel.user, item.post, commentText);
            item.post.addComment(comment);
            var commentViewModel = new CommentViewModel(comment, item);
            commentViewModel.display(function onDisplayed() {
                commentViewModel.connectModelWithView();
            });
        });
    };

    PostViewModel.prototype.onDeleteClick = function onDeleteClick() {
        Guard.handleError(this, function removePost(item) {
            item.contextViewModel.context.removePost(item.post);
            item.htmlNode.remove();
        });
    };

    PostViewModel.prototype.onVoteUpClick = function onVoteUpClick() {
        Guard.handleError(this, function voteUp(item) {
            var Rating = require("Rating");
            item.post.addRating(new Rating(item.contextViewModel.context, item.contextViewModel.userViewModel.user, item.post, 1));
        });
    };

    PostViewModel.prototype.onVoteDownClick = function onVoteDownClick() {
        Guard.handleError(this, function voteDown(item) {
            var Rating = require("Rating");
            item.post.addRating(new Rating(item.contextViewModel.context, item.contextViewModel.userViewModel.user, item.post, -1));
        });
    };

    return PostViewModel;
});