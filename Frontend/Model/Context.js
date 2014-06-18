'use strict';

/*jslint browser: true*/
/*global window, requirejs, define */

define(function (require) {
    var $ = require("jquery");
    var Guard = require("Guard");

    function Context() {
        var User = require("User");

        this.posts = [];
        this.user = User.userFromCookie(this);

        if (this.user.name !== User.anonymous) {
            this.user.login();
        } else {
            this.user.display();
        }

        this.postTableNode = $("#linkContentTable");
    }

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
            var address = $("#webAddress").val();
            var text = $("#innerHTML").val();
            new Post(this, this.user, address, text);
        });
    };

    return Context;
});
