'use strict';

/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

define(function (require) {

    var $ = require("jquery");
    var Context = require("Context");
    function TestContext() {}

    TestContext.createTestContext = function () {

        var TestUser = require("TestUser");

        var result = new Context();
        result.user = TestUser.createTestUser(result);
        result.postTableNode = $("<ul>");
        result.addPostButton = $("<button>");

        return result;
    };

    return TestContext;
});