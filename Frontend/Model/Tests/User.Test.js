
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

define(function (require) {
    'use strict';
    var $ = require("jquery");
    var User = require("User");
    function TestUser() {}

    TestUser.createTestUser = function (context) {
        var result = new User(context, "test", "test");
        result.htmlNode = $("<div>").addClass("login");

        return result;
    };

    QUnit.module("User");
    QUnit.asyncTest("login", function (assert) {
        require(["TestContext"], function (TestContext) {
            var testContext = TestContext.createTestContext();
            var testUser = TestUser.createTestUser(testContext);
            assert.equal(testUser.loginstate, User.LoginState.LoggedOut, "Created users are logged out");

            testUser.login();
            assert.equal(testUser.loginstate, User.LoginState.LoggedIn, "after login was called a user is logged in");

            testUser.logout();
            assert.equal(testUser.loginstate, User.LoginState.LoggedOut, "after logout was called a user is logged out");

            QUnit.start();
        });
    });

    return TestUser;
});