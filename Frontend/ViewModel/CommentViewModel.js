
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function defineCommentViewModel(require) {
    'use strict';
    var Guard = require("Guard");
    var $ = require("jquery");

    function CommentViewModel(comment, postViewModel, htmlNode) {
        this.comment = comment;
        this.postViewModel = postViewModel;
        this.htmlNode = htmlNode;
    }

    CommentViewModel.prototype.display = function display(callback) {
        var item = this;
        require(['hbs!View/comment'], function (template) {
            item.htmlNode = $(template(item.comment));
            item.postViewModel.htmlNode.comments.append(item.htmlNode);
            item.connectModelWithView();
            if (callback) {
                callback();
            }
        });
    };

    CommentViewModel.prototype.connectModelWithView = function connectWithModel() {
        this.htmlNode.find(".commentDeleteButton").on({
            click: $.proxy(this.onDeleteClick, this)
        });
    };

    CommentViewModel.prototype.onDeleteClick = function onDeleteClick() {
        Guard.handleError(this, function remove(item) {
            item.remove();
        });
    };

    CommentViewModel.prototype.remove = function remove() {
        this.postViewModel.post.removeComment(this.comment);
        this.postViewModel.commentViewModels.remove(this);

        if (this.htmlNode) {
            this.htmlNode.remove();
        }
    };

    return CommentViewModel;
});