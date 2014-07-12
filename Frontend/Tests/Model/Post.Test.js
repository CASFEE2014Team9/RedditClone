
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

define(function defineTestPost(require) {
    'use strict';
    var Post = require("Post");
    var PostViewModel = require("PostViewModel");

    function TestPost() {
    }

    TestPost.createTestPost = function createTestPost(testUserViewModel) {
        var result = new PostViewModel(new Post(testUserViewModel.contextViewModel.context, testUserViewModel.user, "www.google.com", "Google", "Description"), testUserViewModel.contextViewModel);
        testUserViewModel.contextViewModel.postViewModels.add(result);
        return result;
    };

    QUnit.module("Post");
    QUnit.asyncTest("create / delete", function (assert) {
        setTimeout(function () {
            var TestContext = require("TestContext");

            var testContextViewModel = TestContext.createTestContext();
            var testUser = testContextViewModel.userViewModel;

            assert.equal(testContextViewModel.postTableNode.children().length, 0, "no posts should be displayed");

            var postViewModel = TestPost.createTestPost(testUser);
            testContextViewModel.context.addPost(postViewModel.post);

            postViewModel.display(function onPostDisplayed() {
                assert.equal(testContextViewModel.postTableNode.children().length, 1, "created posts should be displayed");
                assert.ok(testContextViewModel.context.posts.contains(postViewModel.post), "created posts are present in the context");

                postViewModel.remove();

                assert.equal(testContextViewModel.postTableNode.children().length, 0, "no posts should be displayed");
                assert.ok(!testContextViewModel.context.posts.contains(postViewModel.post), "deleted posts are not present in the context");
                QUnit.start();
            });
        }, 1000);
    });

    QUnit.test("create with wrong arguments", function (assert) {
        var TestContext = require("TestContext");

        var testContext = TestContext.createTestContext();
        var testUser = testContext.userViewModel;

        assert.throws(
            function () {
                var post = new Post("no user object", "url", "title", "description");
                post.validate();
            },
            TypeError,
            "creator must be a User"
        );

        assert.throws(
            function () {
                var post = new Post(testUser, null, "title", "description");
                post.validate();
            },
            TypeError,
            "url must not be a null"
        );
    });

    QUnit.asyncTest("events should be handled without error", function (assert) {
        var TestContext = require("TestContext");

        var testContextViewModel = TestContext.createTestContext();

        testContextViewModel.addressInput.val("www.google.com");
        testContextViewModel.textInput.val("a search engine");
        testContextViewModel.addPostButton.trigger('click');

        assert.ok(testContextViewModel.context.posts.count() === 1, "Post should be created");
        var postViewModel = testContextViewModel.postViewModels.items[0];
        assert.ok(postViewModel.post.isEditing, "Post should be in edit mode");

        postViewModel.display(function () {
            postViewModel.htmlNode.postAddressInput.val('www.google.com');
            postViewModel.htmlNode.commitEditButton.trigger('click');
            assert.ok(!postViewModel.post.isEditing, "Post should not be in edit mode");

            postViewModel.display(function () {
                postViewModel.htmlNode.deleteButton.trigger('click');

                assert.ok(testContextViewModel.context.posts.count() === 0, "Post should be deleted");
                QUnit.start();
            });
        });
    });

    return TestPost;
});