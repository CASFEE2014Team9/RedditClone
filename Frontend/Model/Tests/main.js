
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

(function () {
    'use strict';

    requirejs.config({
        baseUrl: 'http://localhost:9000/',
        paths: {
            TestContext: './Model/Tests/Context.Test',
            TestUser: './Model/Tests/User.Test',
            TestPost: './Model/Tests/Post.Test',
            TestComment: './Model/Tests/Comment.Test',
            TestRating: './Model/Tests/Rating.Test'
        }
    });

    require(["requirejs-config"], function () {
        require([
            "Guard",
            "TestContext",
            "TestUser",
            'TestPost',
            "TestComment",
            "TestRating"], function (Guard) {
            Guard.isUnitTesting = true;

            QUnit.load();
            QUnit.start();
        });
    });
}());