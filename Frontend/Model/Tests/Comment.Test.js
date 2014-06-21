
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

define(function (require) {
    'use strict';
    var $ = require("jquery");
    var Comment = require("Comment");
    var Array = require("Array");
    function TestComment() {}

    TestComment.createTestComment = function (testUser, testPost) {
        var result = new Comment(testUser.context, testUser, testPost, "troll");
        return result;
    };
    QUnit.module("Comment");
    QUnit.test("create / delete Comment", function (assert) {
        var TestContext = require("TestContext");
        var TestUser = require("TestUser");
        var TestPost = require("TestPost");

        var testContext = TestContext.createTestContext();
        var testUser = TestUser.createTestUser(testContext);
        var testPost = TestPost.createTestPost(testUser);

        assert.equal(testPost.htmlNode.comments.children().length, 0, "no comments should be displayed");

        var comment = TestComment.createTestComment(testUser, testPost);

        assert.equal(testPost.htmlNode.comments.children().length, 1, "created comments should be displayed");
        assert.ok(testPost.comments.contains(comment), "created comments are present in the post");

        comment.delete();

        assert.equal(testPost.htmlNode.comments.children().length, 0, "no comments should be displayed");
        assert.ok(!testPost.comments.contains(comment), "deleted comments are not present in the post");
    });

    QUnit.test("create with wrong arguments", function (assert) {
        var TestContext = require("TestContext");
        var TestUser = require("TestUser");
        var TestPost = require("TestPost");

        var testContext = TestContext.createTestContext();
        var testUser = TestUser.createTestUser(testContext);
        var testPost = TestPost.createTestPost(testUser);

        assert.throws(
            function () {
                var comment = new Comment("no user", testPost, "lala");
            },
            TypeError,
            "creator must be a User"
        );

        assert.throws(
            function () {
                var comment = new Comment(testUser, "no post", "lala");
            },
            TypeError,
            "post must be a Post"
        );
    });

    return TestComment;
});

