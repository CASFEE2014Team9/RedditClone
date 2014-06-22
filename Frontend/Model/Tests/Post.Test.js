
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

define(function (require) {
    'use strict';
    var $ = require("jquery");
    var Post = require("Post");
    var Array = require("Array");
    function TestPost() {}

    TestPost.createTestPost = function (testUser) {
        var result = new Post(testUser.context, testUser, "www.google.com", "Google", "Description");
        return result;
    };

    QUnit.module("Post");
    QUnit.test("create / delete", function (assert) {
        var TestContext = require("TestContext");

        var testContext = TestContext.createTestContext();
        var testUser = testContext.user;

        assert.equal(testContext.postTableNode.children().length, 0, "no posts should be displayed");

        var post = TestPost.createTestPost(testUser);

        assert.equal(testContext.postTableNode.children().length, 1, "created posts should be displayed");
        assert.ok(testContext.posts.contains(post), "created posts are present in the context");

        post.delete();

        assert.equal(testContext.postTableNode.children().length, 0, "no posts should be displayed");
        assert.ok(!testContext.posts.contains(post), "deleted posts are not present in the context");
    });

    QUnit.test("create with wrong arguments", function (assert) {
        var TestContext = require("TestContext");

        var testContext = TestContext.createTestContext();
        var testUser = testContext.user;

        assert.throws(
            function () {
                var post = new Post("no user object", "url", "title", "description");
            },
            TypeError,
            "creator must be a User"
        );

        assert.throws(
            function () {
                var post = new Post(testUser, null, "title", "description");
            },
            TypeError,
            "url must not be a null"
        );
    });

    QUnit.test("events should be handled without error", function (assert) {
        var TestContext = require("TestContext");

        var testContext = TestContext.createTestContext();

        testContext.addressInput.val("www.google.com");
        testContext.textInput.val("a search engine");
        testContext.addPostButton.trigger('click');

        assert.ok(testContext.posts.length === 1, "Post should be created");

        var post = testContext.posts[0];
        post.htmlNode.deleteButton.trigger('click');

        assert.ok(testContext.posts.length === 0, "Post should be deleted");
    });

    return TestPost;
});