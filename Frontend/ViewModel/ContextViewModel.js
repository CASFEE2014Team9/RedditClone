
/*jslint browser: true*/
/*global window, requirejs, define, alert, parseInt */

define(function defineContextViewModel(require) {
    'use strict';

    var $ = require("jquery");
    var Guard = require("Guard");
    var Context = require("Context");
    var List = require("List");

    function ContextViewModel() {
        var LoginDialog = require("LoginDialog");
        var PostViewModel = require("PostViewModel");

        this.userViewModel = null;
        this.context = new Context();

        this.postTableNode = $("#linkContentTable");
        this.categoryTableNode = $(".cat");
        this.addPostButton = $("#addPostButton");
        this.addressInput = $("#webAddress");
        this.textInput = $("#innerHTML");
        this.loginDialog = new LoginDialog($("#loginDialog"), this);
        this.postViewModels = new List(PostViewModel);
    }

    ContextViewModel.prototype.initialize = function initialize() {
        var User = require("User");
        var UserViewModel = require("UserViewModel");

        this.loginDialog.initialize();
        this.addPostButton.off({
            click: $.proxy(this.onAddLinkButtonClicked, this)
        }).on({
            click: $.proxy(this.onAddLinkButtonClicked, this)
        });

        //then fetch the userViewModel from cookies which might take some time
        this.userViewModel = UserViewModel.FromCookie(this);

        if (this.userViewModel.user.name !== User.anonymous) {
            this.userViewModel.login();
        }

        this.userViewModel.display();
    };

    ContextViewModel.prototype.onAddLinkButtonClicked = function onAddLinkButtonClicked() {
        Guard.handleError(this, function addPost(item) {
            var Post = require("Post");
            var PostViewModel = require("PostViewModel");

            var address = item.addressInput.val();
            var text = item.textInput.val();
            var post = new Post(item.context, item.userViewModel.user, address, text);
            post.isEditing = true;
            post.isNew = true;
            var postViewModel = new PostViewModel(post, item);

            item.postViewModels.add(postViewModel);
            item.context.addPost(post);
            postViewModel.display();
        });
    };

    ContextViewModel.prototype.connectModelWithView = function connectWithModel() {
        var PostViewModel = require("PostViewModel");
        var item = this;

        this.postTableNode.children().each(function () {
            var htmlNode = $(this);
            var dataId = parseInt(htmlNode.attr("data-id"));

            var postViewModel = item.postViewModels.findByPredicate(function (p) { return p.post.id === dataId; });
            if (!postViewModel) {
                var post = item.context.posts.findByKey('id', dataId);
                postViewModel = new PostViewModel(post, item, htmlNode);
            } else {
                postViewModel.htmlNode = htmlNode;
            }

            postViewModel.connectModelWithView();
        });

        /*
        var CategoryViewModel = require("CategoryViewModel");
        this.categoryTableNode.children().each(function () {
            var htmlNode = $(this);
            var dataId = $(this).attr("data-id");
            var category = context.categories.findByKey('id', dataId);
            var categoryViewModel = new CategoryViewModel(category, this, htmlNode);
        });
        */
    };

    return ContextViewModel;
});