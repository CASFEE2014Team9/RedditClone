
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

(function () {
    'use strict';

    requirejs.config({
        baseUrl: 'http://localhost:9000/',
        paths: {
            domReady : './Lib/requirejs-domready/domReady',
            jquery: './Lib/jquery/dist/jquery',
            jqueryui: './Lib/jquery-ui/ui/jquery-ui',
            cookie: './Lib/Cookies/dist/cookies.min',
            Guard: './Lib/guard',
            string: './Lib/string',
            Array: './Lib/Array',
            QUnit: './Lib/qunit/qunit/qunit',
            Context: './Model/Context',
            User: './Model/User',
            Post: './Model/Post',
            Comment: './Model/Comment',
            Rating: './Model/Rating',
            TestContext: './Model/Tests/Context.Test',
            TestUser: './Model/Tests/User.Test',
            TestPost: './Model/Tests/Post.Test',
            TestComment: './Model/Tests/Comment.Test',
            TestRating: './Model/Tests/Rating.Test',
            LoginDialog: './Forms/LoginDialog'
        }
    });

    require([
        "TestContext",
        "TestUser",
        'TestPost',
        "TestComment",
        "TestRating"], function () {

    });
}());