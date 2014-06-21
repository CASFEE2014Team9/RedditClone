
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function (require) {
    'use strict';
    function Guard() {}

    var $ = require("jquery");
    var string = require("string");
    Guard.isUnitTesting = false;

    Guard.customType = function (parameter, parameterName, type) {
        if (parameter === undefined) {
            throw new TypeError("{0} must not be undefined".format(parameterName));
        }

        if (parameter === null) {
            throw new TypeError("{0} must not be null".format(parameterName));
        }

        if (!(parameter instanceof type)) {
            throw new TypeError("{0} must be of type {1}".format(parameterName, type));
        }
    };

    Guard.string = function (parameter, parameterName) {
        if (parameter === undefined) {
            throw new TypeError("{0} must not be undefined".format(parameterName));
        }

        if (parameter === null) {
            throw new TypeError("{0} must not be null".format(parameterName));
        }

        if (typeof parameter !== "string") {
            throw new TypeError("{0} must be a string".format(parameterName));
        }

        if (parameter === "") {
            throw new TypeError("{0} must not be an empty string".format(parameterName));
        }
    };

    Guard.stringFallback = function (parameter, parameterName, fallback) {
        if (parameter === undefined) {
            return fallback;
        }

        if (parameter === null) {
            return fallback;
        }

        if (typeof parameter !== "string") {
            return fallback;
        }

        if (parameter === "") {
            return fallback;
        }

        return parameter;
    };

    Guard.handleError = function (funcname, context, func) {
        if (Guard.isUnitTesting) {
            $.proxy(func, context)();
        } else {
            try {
                $.proxy(func, context)();
            } catch (ex) {

                var exmsg = "";
                if (ex.message) {
                    exmsg += ex.message;
                }
                if (ex.stack) {
                    exmsg += ' | stack: ' + ex.stack;
                }

                alert("{0} failed. {1}".format(funcname, ex.message));
                console.log(exmsg);
            }
        }
    };

    return Guard;
});