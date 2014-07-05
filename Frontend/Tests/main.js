
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

(function () {
    'use strict';

    var modelTests = './Tests/Model/';

    requirejs.config({
        baseUrl: 'http://localhost:9000/',
        paths: {
            TestContext: modelTests + 'Context.Test',
            TestUser: modelTests + 'User.Test',
            TestPost: modelTests + 'Post.Test',
            TestComment: modelTests + 'Comment.Test',
            TestRating: modelTests + 'Rating.Test'
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