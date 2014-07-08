
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function defineContext(require) {
    'use strict';

    var List = require("List");

    function Context() {
        var Post = require("Post");
        var Category = require("Category");

        this.posts = new List(Post);
        this.categories = new List(Category);
    }

    Context.prototype.getPosts = function getPosts() {
        var Post = require("Post");
        var User = require("User");
        // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {
        //   console.dir(data);
        //success handler
        // });
        this.addPost(new Post(this, new User(this, "lala", "lala"), "http://espn.go.com/nhl", "Sports World: ESPN NHL", "All american sports information you can imagine: results, schedules, team information, statistics and background stories about specific issues."));
    };

    Context.prototype.getCategories = function getCategories() {
        var Category = require("Category");

        this.addCategory(new Category(this, "Categories"));
        this.addCategory(new Category(this, "All"));
        this.addCategory(new Category(this, "Animals"));
        this.addCategory(new Category(this, "Cars"));
        this.addCategory(new Category(this, "Games"));
        this.addCategory(new Category(this, "Lifestyle"));
        this.addCategory(new Category(this, "Movies & TV"));
        this.addCategory(new Category(this, "Sports"));
    };

    Context.prototype.addPost = function addPost(post) {
        this.posts.add(post);
    };

    Context.prototype.removePost = function removePost(post) {
        this.posts.remove(post);
    };

    Context.prototype.addCategory = function addCategory(category) {
        this.categories.add(category);
    };

    Context.prototype.removeCategory = function addCategory(category) {
        this.categories.add(category);
    };

    return Context;
});
