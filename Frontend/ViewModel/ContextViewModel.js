
/*jslint browser: true*/
/*global window, requirejs, define, alert, parseInt */

define(function defineContextViewModel(require) {
    'use strict';

    var $ = require("jquery");
    var Guard = require("Guard");
    var Context = require("Context");

    function ContextViewModel() {
        var LoginDialog = require("LoginDialog");

        this.userViewModel = null;
        this.context = new Context();

        this.postTableNode = $("#linkContentTable");
        this.categoryTableNode = $(".cat");
        this.addPostButton = $("#addPostButton");
        this.addressInput = $("#webAddress");
        this.textInput = $("#innerHTML");
        this.loginDialog = new LoginDialog($("#loginDialog"), this);
    }

    ContextViewModel.prototype.initialize = function initialize() {
        var User = require("User");
        var UserViewModel = require("UserViewModel");

        this.loginDialog.initialize();
        this.addPostButton.on({
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

            item.context.addPost(post);
            var postViewModel = new PostViewModel(post, item);
            postViewModel.display();
        });
    };

    ContextViewModel.prototype.connectModelWithView = function connectWithModel() {
        var PostViewModel = require("PostViewModel");
        var CategoryViewModel = require("CategoryViewModel");
        var item = this;

        this.postTableNode.children().each(function () {
            var htmlNode = $(this);
            var dataId = parseInt(htmlNode.attr("data-id"));
            var post = item.context.posts.findByKey('id', dataId);
            var postViewModel = new PostViewModel(post, item, htmlNode);
            postViewModel.connectModelWithView();
        });

        /*
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