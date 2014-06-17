define(function(require, exports, module) {

    var $ = require("jquery");
    var Context = require("Context");
    function TestContext(){};

    TestContext.createTestContext = function () {

        var TestUser = require("TestUser");

        var result = new Context();
        result.user = TestUser.createTestUser(result);
        result.postTableNode = $("<ul>");

        return result;
    };

    return TestContext;
});