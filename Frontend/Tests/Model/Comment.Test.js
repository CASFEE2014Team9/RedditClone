
/*jslint browser: true*/
/*global window, requirejs, define, QUnit, setTimeout */

define(function defineTestComment(require) {
    'use strict';
    var Comment = require("Comment");
    function TestComment() {
    }

    TestComment.createTestComment = function (testUser, testPost) {
        var result = new Comment(testUser.contextViewModel.context, testUser.user, testPost.post, "troll");
        return result;
    };

    QUnit.module("Comment");
    QUnit.asyncTest("create / delete Comment", function (assert) {
        setTimeout(function () {
            var TestContext = require("TestContext");
            var TestPost = require("TestPost");

            var testContext = TestContext.createTestContext();
            var testUser = testContext.userViewModel;
            var testPost = TestPost.createTestPost(testUser);

            testPost.display(function onPostDisplayed() {
                assert.equal(testPost.htmlNode.comments.children().length, 0, "no comments should be displayed");

                var comment = TestComment.createTestComment(testUser, testPost);
                testPost.post.addComment(comment);
                testPost.display(function onCommentDisplayed() {

                    assert.equal(testPost.htmlNode.comments.children().length, 1, "created comments should be displayed");
                    assert.ok(testPost.post.comments.contains(comment), "created comments are present in the post");

                    testPost.post.removeComment(comment);

                    assert.equal(testPost.htmlNode.comments.children().length, 0, "no comments should be displayed");
                    assert.ok(!testPost.post.comments.contains(comment), "deleted comments are not present in the post");
                    QUnit.start();
                });
            });
        }, 1000);
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
                comment.toString();
            },
            TypeError,
            "creator must be a User"
        );

        assert.throws(
            function () {
                var comment = new Comment(testUser, "no post", "lala");
                comment.toString();
            },
            TypeError,
            "post must be a Post"
        );
    });

    return TestComment;
});

