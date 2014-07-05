
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

define(function defineTestContext(require) {
    'use strict';
    var $ = require("jquery");
    var Context = require("Context");
    function TestContext() {
    }

    TestContext.createTestContext = function () {

        var TestUser = require("TestUser");
        var LoginDialog = require("LoginDialog");

        var result = new Context();
        result.userViewModel = TestUser.createTestUser(result);
        result.postTableNode = $("<ul>");
        result.categoryTableNode = $("<ul>");
        result.addPostButton = $("<button>");
        result.addressInput = $("<input>");
        result.textInput = $("<input>");
        result.loginDialog = new LoginDialog($("<form>"), result);
        result.loginDialog.loginInput = $("<input>");
        result.loginDialog.passwordInput = $("<input>");
        result.loginDialog.loginButton = $("<button>");

        result.initialize();
        result.loginDialog.initialize();

        return result;
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