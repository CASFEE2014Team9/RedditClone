
/*jslint browser: true*/
/*global window, requirejs, define, alert, parseInt */

define(function definePostViewModel(require) {
    'use strict';
    var Guard = require("Guard");
    var $ = require("jquery");

    function PostViewModel(post, contextViewModel, htmlNode) {
        var LoginDialog = require("LoginDialog");
        var List = require("List");
        var CommentViewModel = require("CommentViewModel");

        this.post = post;
        this.contextViewModel = contextViewModel;
        this.htmlNode = htmlNode;
        this.commentDialog = new LoginDialog($("#loginDialog"), this);
        this.commentViewModels = new List(CommentViewModel);
    }

    PostViewModel.prototype.initialize = function initialize() {
        this.commentDialog.initialize();
    };

    PostViewModel.prototype.display = function display(callback) {
        var item = this;
        require(['hbs!View/post'], function (template) {
            var neon$ = template(item.post);
            var newNode = $(neon$);
            if (item.htmlNode) {
                item.htmlNode.replaceWith(newNode);
            } else {
                if (item.post.isEditing && item.post.isNew) {
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
        this.htmlNode.commentInput = $(".postCommentInput");
        this.htmlNode.comments = this.htmlNode.find(".postComments");
        this.htmlNode.postAddressInput = this.htmlNode.find(".postAddressInput");
        this.htmlNode.postTitleInput = this.htmlNode.find(".postTitleInput");
        this.htmlNode.postDescriptionInput = this.htmlNode.find(".postDescriptionInput");

        this.htmlNode.deleteButton = this.htmlNode.find(".postDeleteButton").off({
            click: $.proxy(this.onDeleteClick, this)
        }).on({
            click: $.proxy(this.onDeleteClick, this)
        });

        this.htmlNode.postEditButton = this.htmlNode.find(".postEditButton").off({
            click: $.proxy(this.onPostEditClick, this)
        }).on({
            click: $.proxy(this.onPostEditClick, this)
        });

        $(".postAddCommentButton").off({
            click: $.proxy(this.onAddCommentClick, this)
        }).on({
            click: $.proxy(this.onAddCommentClick, this)
        });
        this.htmlNode.find(".commentPostButton").off({
            click: $.proxy(this.onCommentPostClick, this)
        }).on({
            click: $.proxy(this.onCommentPostClick, this)
        });
        this.htmlNode.commentPostDialog = $("#commentPostDialog").dialog({
            autoOpen: false
        });

        this.htmlNode.find(".postRatingVoteUpButton").off({
            click: $.proxy(this.onVoteUpClick, this)
        }).on({
            click: $.proxy(this.onVoteUpClick, this)
        });

        this.htmlNode.find(".postRatingVoteDownButton").off({
            click: $.proxy(this.onVoteDownClick, this)
        }).on({
            click: $.proxy(this.onVoteDownClick, this)
        });

        this.htmlNode.commitEditButton = this.htmlNode.find(".postCommitEditButton").off({
            click: $.proxy(this.onCommitEditClick, this)
        }).on({
            click: $.proxy(this.onCommitEditClick, this)
        });

        this.htmlNode.find(".postCancelEditButton").off({
            click: $.proxy(this.onCancelEditClick, this)
        }).on({
            click: $.proxy(this.onCancelEditClick, this)
        });

        var item = this;
        this.htmlNode.comments.children().each(function () {
            var CommentViewModel = require("CommentViewModel");

            var htmlNode = $(this);
            var dataId = parseInt(htmlNode.attr("data-id"));

            var commentViewModel = item.commentViewModels.findByPredicate(function (c) { return c.comment.id === dataId; });
            if (!commentViewModel) {
                var comment = item.post.comments.findByKey('id', dataId);
                commentViewModel = new CommentViewModel(comment, item, htmlNode);
            } else {
                commentViewModel.htmlNode = htmlNode;
            }

            commentViewModel.connectModelWithView();
        });
    };

    PostViewModel.prototype.onAddCommentClick = function onAddCommentClick(evt) {
        evt.preventDefault();

        Guard.handleError(this, function addComment(item) {
            var Comment = require("Comment");
            var CommentViewModel = require("CommentViewModel");

            var commentText = item.htmlNode.commentInput.val();
            var comment = new Comment(item.contextViewModel.context, item.contextViewModel.userViewModel.user, item.post, commentText);
            var commentViewModel = new CommentViewModel(comment, item);

            item.commentViewModels.add(commentViewModel);
            item.post.addComment(comment);

            commentViewModel.display();

            item.htmlNode.commentPostDialog.dialog("close");
        });
    };

    PostViewModel.prototype.onCommentPostClick = function onCommentPostClick() {
        this.htmlNode.commentPostDialog.dialog("open");
    };

    PostViewModel.prototype.onDeleteClick = function onDeleteClick() {
        Guard.handleError(this, function removePost(item) {
            item.remove();
        });
    };

    PostViewModel.prototype.remove = function remove() {
        this.contextViewModel.context.removePost(this.post);
        this.contextViewModel.postViewModels.remove(this);

        if (this.htmlNode) {
            this.htmlNode.remove();
        }
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

    PostViewModel.prototype.onPostEditClick = function onPostEditClick() {
        Guard.handleError(this, function BeginEdit(item) {
            item.post.isEditing = true;
            item.display();
        });
    };

    PostViewModel.prototype.onCommitEditClick = function onCommitEditClick() {
        var valid = Guard.handleError(this, function CommitEdit(item) {
            item.post.url = item.htmlNode.postAddressInput.val();
            item.post.title = item.htmlNode.postTitleInput.val();
            item.post.description = item.htmlNode.postDescriptionInput.val();
            item.post.validate();
        });

        if (valid) {
            var item = this;
            item.post.isEditing = false;
            item.post.isNew = false;
            item.display();
        }
    };

    PostViewModel.prototype.onCancelEditClick = function onCancelEditClick() {
        Guard.handleError(this, function CancelEdit(item) {
            if (item.post.isNew) {
                item.contextViewModel.context.removePost(item.post);
                item.htmlNode.remove();
            } else {
                item.post.isEditing = false;
                item.display();
            }
        });
    };

    return PostViewModel;
});