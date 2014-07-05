
/*jslint browser: true*/
/*global window, requirejs, define, QUnit */

define(function defineTestCategory(require) {
    'use strict';
    var Category = require("Category");

    function TestCategory() {
    }

    TestCategory.createTestCategory = function (testcontext) {
        var result = new Category(testcontext, "Test Category");
        return result;
    };

    QUnit.module("Category");
    QUnit.test("create / delete Category", function (assert) {
        var TestContext = require("TestContext");

        var testContext = TestContext.createTestContext();

        assert.equal(testContext.categoryTableNode.children().length, 0, "no categories should be displayed");

        var category = TestCategory.createTestCategory(testContext);
        testContext.addCategory(category);

        assert.equal(testContext.categoryTableNode.children().length, 1, "created categories should be displayed");
        assert.ok(testContext.categories.contains(category), "created categories are present in the context");

        testContext.removeCategory(category);

        assert.equal(testContext.categoryTableNode.children().length, 0, "no categories should be displayed");
        assert.ok(!testContext.categories.contains(category), "deleted categories are not present in the context");
    });

    QUnit.test("create with wrong arguments", function (assert) {
        var TestContext = require("TestContext");

        var testContext = TestContext.createTestContext();

        assert.throws(
            function () {
                var category = new Category("no context", "test");
                category.toString();
            },
            TypeError,
            "context must be a Context"
        );

        assert.throws(
            function () {
                var category = new Category(testContext, null);
                category.toString();
            },
            TypeError,
            "name must not be null"
        );
    });
    return TestCategory;
});