
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function (require) {
    'use strict';
    var $ = require("jquery");
    var Guard = require("Guard");

    function Context() {
        var LoginDialog = require("LoginDialog");

        //map html elements first so they are rendered correctly
        this.postTableNode = $("#linkContentTable");
        this.categoryTableNode = $(".cat");
        this.addPostButton = $("#addPostButton");
        this.addressInput = $("#webAddress");
        this.textInput = $("#innerHTML");
        this.loginDialog = new LoginDialog($("#loginDialog"), this);
        this.posts = [];
        this.categories = [];
        this.user = null;
    }

    Context.prototype.initialize = function initialize() {
        var User = require("User");

        this.loginDialog.initialize();
        this.addPostButton.on({
            click: $.proxy(this.onAddLinkButtonClicked, this)
        });

        //then fetch the user from cookies which might take some time
        this.user = User.userFromCookie(this);

        if (this.user.name !== User.anonymous) {
            this.user.login();
        } else {
            this.user.display();
        }
    };

    Context.prototype.getPosts = function getPosts() {
        var Post = require("Post");
        // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {
        //   console.dir(data);
        //success handler
        // });
        this.addPost(new Post(this, this.user, "http://espn.go.com/nhl", "Sports World: ESPN NHL", "All american sports information you can imagine: results, schedules, team information, statistics and background stories about specific issues."));
    };

    Context.prototype.addPost = function addPost(post) {
        this.posts.push(post);
    };

    Context.prototype.removePost = function removePost(post) {
        post.htmlNode.remove();
        this.posts.removeItem(post);
    };

    Context.prototype.addCategory = function addCategory(category) {
        this.categories.push(category);
    };

    Context.prototype.removeCategory = function addCategory(category) {
        category.htmlNode.remove();
        this.categories.removeItem(category);
    };

    Context.prototype.getCategories = function getCategories() {
        var Category = require("Category");

        this.addCategory(new Category(this, "All"));
        this.addCategory(new Category(this, "Animals"));
        this.addCategory(new Category(this, "Cars"));
        this.addCategory(new Category(this, "Games"));
        this.addCategory(new Category(this, "Lifestyle"));
        this.addCategory(new Category(this, "Movies & TV"));
        this.addCategory(new Category(this, "Sports"));
    };

    Context.prototype.onAddLinkButtonClicked = function onAddLinkButtonClicked() {
        Guard.handleError(this, function addPost(item) {
            var Post = require("Post");
            var address = item.addressInput.val();
            var text = item.textInput.val();
            item.addPost(new Post(item, item.user, address, text));
        });
    };

    return Context;
});
