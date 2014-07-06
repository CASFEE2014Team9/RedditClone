
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

define(function defineTestContext(require) {
    'use strict';
    var $ = require("jquery");
    var ContextViewModel = require("ContextViewModel");
    function TestContext() {
    }

    TestContext.createTestContext = function () {

        var TestUser = require("TestUser");
        var LoginDialog = require("LoginDialog");

        var contextViewModel = new ContextViewModel();
        contextViewModel.postTableNode = $("<ul>");
        contextViewModel.categoryTableNode = $("<ul>");
        contextViewModel.addPostButton = $("<button>");
        contextViewModel.addressInput = $("<input>");
        contextViewModel.textInput = $("<input>");
        contextViewModel.loginDialog = new LoginDialog($("<form>"), contextViewModel);
        contextViewModel.loginDialog.loginInput = $("<input>");
        contextViewModel.loginDialog.passwordInput = $("<input>");
        contextViewModel.loginDialog.loginButton = $("<button>");

        contextViewModel.initialize();
        contextViewModel.loginDialog.initialize();

        // test user overrides cookie user from initialize
        contextViewModel.userViewModel = TestUser.createTestUser(contextViewModel);

        return contextViewModel;
    };

    QUnit.module("Context");
    QUnit.test("lists should be type save", function (assert) {
        assert.throws(
            function () {
                var testContext = TestContext.createTestContext();
                var Category = require("Category");
                var category = new Category(testContext, "category");
                testContext.addPost(category);
            },
            TypeError,
            "only posts may be added to the post list"
        );
    });

    return TestContext;
});