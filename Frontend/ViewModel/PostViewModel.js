
/*jslint browser: true*/
/*global window, requirejs, define, alert, parseInt */

define(function definePostViewModel(require) {
    'use strict';
    var Guard = require("Guard");
    var $ = require("jquery");

    function PostViewModel(post, contextViewModel, htmlNode) {
        var LoginDialog = require("LoginDialog");

        this.post = post;
        this.contextViewModel = contextViewModel;
        this.htmlNode = htmlNode;
        this.commentDialog = new LoginDialog($("#loginDialog"), this);
    }

    PostViewModel.prototype.initialize = function initialize() {
        this.commentDialog.initialize();
    };

    PostViewModel.prototype.display = function display(callback) {
        var item = this;
        require(['hbs!View/post'], function (template) {
            var newNode = $(template(item.post));
            if (item.htmlNode) {
                item.htmlNode.replaceWith(newNode);
            } else {
                if (item.post.isEditing) {
                    item.contextViewModel.postTableNode.prepend(newNode);
                } else {
                    item.contextViewModel.postTableNode.append(newNode);
                }
            }
            item.htmlNode = newNode;
            item.connectModelWithView();
            if (callback) {
                callback();
            }
        });
    };

    PostViewModel.prototype.connectModelWithView = function connectWithModel() {
        this.htmlNode.commentInput = this.htmlNode.find(".postCommentInput");
        this.htmlNode.comments = this.htmlNode.find(".postComments");
        this.htmlNode.postAddressInput = this.htmlNode.find(".postAddressInput");
        this.htmlNode.postTitleInput = this.htmlNode.find(".postTitleInput");
        this.htmlNode.postDescriptionInput = this.htmlNode.find(".postDescriptionInput");

        this.htmlNode.find(".postDeleteButton").on({
            click: $.proxy(this.onDeleteClick, this)
        });
        this.htmlNode.find(".postAddCommentButton").on({
            click: $.proxy(this.onAddCommentClick, this)
        });
        this.htmlNode.find(".commentPostButton").on({
            click: $.proxy(this.onCommentPostClick, this)
        });
        this.htmlNode.commentPostDialog = $(".commentPostDialog").dialog({
            autoOpen: false
        });

        this.htmlNode.find(".postRatingVoteUpButton").on({
            click: $.proxy(this.onVoteUpClick, this)
        });

        this.htmlNode.find(".postRatingVoteDownButton").on({
            click: $.proxy(this.onVoteDownClick, this)
        });

        this.htmlNode.find(".postCommitEditButton").on({
            click: $.proxy(this.onCommitEditClick, this)
        });

        this.htmlNode.find(".postCancelEditButton").on({
            click: $.proxy(this.onCancelEditClick, this)
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
            commentViewModel.display();
        });
    };

    PostViewModel.prototype.onCommentPostClick = function onCommentPostClick() {
        this.htmlNode.commentPostDialog.dialog("open");
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
            item.display();
        });
    };

    PostViewModel.prototype.onVoteDownClick = function onVoteDownClick() {
        Guard.handleError(this, function voteDown(item) {
            var Rating = require("Rating");
            item.post.addRating(new Rating(item.contextViewModel.context, item.contextViewModel.userViewModel.user, item.post, -1));
            item.display();
        });
    };

    PostViewModel.prototype.onCommitEditClick = function onCommitEditClick() {
        var valid;
        Guard.handleError(this, function CommitEdit(item) {
            item.post.url = item.htmlNode.postAddressInput.val();
            item.post.title = item.htmlNode.postTitleInput.val();
            item.post.description = item.htmlNode.postDescriptionInput.val();
            item.post.validate();
            valid = true;
        });

        if (valid) {
            var item = this;
            item.post.isEditing = false;
            item.display();
        }
    };

    PostViewModel.prototype.onCancelEditClick = function onCancelEditClick() {
        Guard.handleError(this, function CancelEdit(item) {
            item.contextViewModel.context.removePost(item.post);
            item.htmlNode.remove();
        });
    };

    return PostViewModel;
});