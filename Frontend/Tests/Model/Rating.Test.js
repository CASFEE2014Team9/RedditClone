
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

define(function defineTestRating(require) {
    'use strict';
    var Rating = require("Rating");

    function TestRating() {
    }

    TestRating.createTestRating = function createTestRating(testUser, testPost) {
        var result = new Rating(testUser.context, testUser, testPost, 100);
        return result;
    };

    QUnit.module("Rating");
    QUnit.test("create / delete", function (assert) {
        var TestContext = require("TestContext");
        var TestPost = require("TestPost");

        var testContext = TestContext.createTestContext();
        var testUser = testContext.userViewModel;
        var testPost = TestPost.createTestPost(testUser);

        var rating = TestRating.createTestRating(testUser, testPost);
        testPost.addRating(rating);

        assert.ok(testPost.ratings.contains(rating), "created ratings are present in the post");

        testPost.removeRating(rating);

        assert.ok(!testPost.ratings.contains(rating), "deleted ratings are not present in the post");
    });

    QUnit.test("create with wrong arguments", function (assert) {
        var TestContext = require("TestContext");
        var TestPost = require("TestPost");

        var testContext = TestContext.createTestContext();
        var testUser = testContext.userViewModel;
        var testPost = TestPost.createTestPost(testUser);

        assert.throws(
            function () {
                var rating = new Rating("no user", testPost, 100);
                rating.toString();
            },
            TypeError,
            "creator must be a User"
        );

        assert.throws(
            function () {
                var rating = new Rating(testUser, "no post", 100);
                rating.toString();
            },
            TypeError,
            "post must be a Post"
        );
    });

    return TestRating;
});