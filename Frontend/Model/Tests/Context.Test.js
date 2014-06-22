
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

define(function (require) {
    'use strict';
    var $ = require("jquery");
    var Context = require("Context");
    function TestContext() {}

    TestContext.createTestContext = function () {

        var TestUser = require("TestUser");
        var LoginDialog = require("LoginDialog");

        var result = new Context();
        result.user = TestUser.createTestUser(result);
        result.postTableNode = $("<ul>");
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

    return TestContext;
});