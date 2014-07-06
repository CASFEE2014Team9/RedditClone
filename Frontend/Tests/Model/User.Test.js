
/*jslint browser: true*/
/*global window, requirejs, define, QUnit, setTimeout */

define(function defineTestUser(require) {
    'use strict';
    var $ = require("jquery");
    var User = require("User");
    var UserViewModel = require("UserViewModel");

    function TestUser() {
    }

    TestUser.createTestUser = function createTestUser(contextViewModel) {
        var result = new UserViewModel(new User(contextViewModel.context, "test", "test"), contextViewModel);
        result.htmlNode = $("<div>").addClass("login");
        result.display();

        return result;
    };

    QUnit.module("User");
    QUnit.asyncTest("login", function (assert) {
        require(["TestContext"], function (TestContext) {
            setTimeout(function () {
                var testContext = TestContext.createTestContext();
                var testUser = testContext.userViewModel;
                assert.equal(testUser.loginstate, User.LoginState.LoggedOut, "Created users are logged out");

                testUser.login();
                assert.equal(testUser.loginstate, User.LoginState.LoggedIn, "after login was called a user is logged in");

                testUser.logout();
                assert.equal(testUser.loginstate, User.LoginState.LoggedOut, "after logout was called a user is logged out");
                QUnit.start();
            }, 1000);
        });
    });

    QUnit.asyncTest("events should be handled without error", function (assert) {
        require(["TestContext"], function (TestContext) {
            setTimeout(function () {
                var testContext = TestContext.createTestContext();
                var testUser = testContext.userViewModel;

                testUser.htmlNode.loginButton.trigger("click");

                testContext.loginDialog.loginInput.val("someName");
                testContext.loginDialog.passwordInput.val("somePassword");
                testContext.loginDialog.loginButton.trigger("click");
                assert.equal(testUser.loginstate, User.LoginState.LoggedIn, "after login was called a user is logged in");

                testUser.htmlNode.logoutButton.trigger("click");
                assert.equal(testUser.loginstate, User.LoginState.LoggedOut, "after logout was called a user is logged out");
                QUnit.start();
            }, 1000);
        });
    });

    return TestUser;
});