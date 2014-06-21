
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
        this.addPostButton = $("#addPostButton");
        this.addressInput = $("#webAddress");
        this.textInput = $("#innerHTML");
        this.loginDialog = new LoginDialog($("#loginDialog"), this);
        this.posts = [];
        this.user = null;
    }

    Context.prototype.initialize = function () {
        var User = require("User");

        this.loginDialog.initialize();
        this.addPostButton.on({
            click: $.proxy(this.OnAddLinkButtonClicked, this)
        });

        //then fetch the user from cookies which might take some time
        this.user = User.userFromCookie(this);

        if (this.user.name !== User.anonymous) {
            this.user.login();
        } else {
            this.user.display();
        }
    };

    Context.prototype.GetPosts = function () {
        var Post = require("Post");
        // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {
        //   console.dir(data);
        //success handler
        // });
        new Post(this, this.user, "http://espn.go.com/nhl", "Sports World: ESPN NHL", "All american sports information you can imagine: results, schedules, team information, statistics and background stories about specific issues.");
    };

    Context.prototype.OnAddLinkButtonClicked = function () {
        Guard.handleError("AddPost", this, function () {
            var Post = require("Post");
            var address = this.addressInput.val();
            var text = this.textInput.val();
            new Post(this, this.user, address, text);
        });
    };

    return Context;
});
