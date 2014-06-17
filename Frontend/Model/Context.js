define(function(require, exports, module) {
    function Context(){
        var User = require("User");

        this.posts = [];

        this.user = User.userFromCookie(this);

        if (this.user.name != User.anonymous)
        {
            this.user.login();
        }
        else
        {
            this.user.display();
        }

        this.postTableNode = $("#linkContentTable");
    }

    Context.prototype.GetPosts = function()
    {
        var Post = require("Post");
        // OData.read("http://localhost:49980/Reddit.svc/Posts/?$format=json", function (data, response) {

        //   console.dir(data);
//success handler

        // });
        new Post(this, this.user, "http://espn.go.com/nhl", "Sports World: ESPN NHL","All american sports information you can imagine: results, schedules, team information, statistics and background stories about specific issues.");
    }

    return Context;
});
