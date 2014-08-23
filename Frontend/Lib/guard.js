
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function (require) {
    'use strict';

    function Guard() {
    }

    Guard.isUnitTesting = false;

    var string = require("string");

    Guard.customType = function customType(parameter, parameterName, type) {
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

    Guard.string = function string(parameter, parameterName) {
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

    Guard.stringFallback = function stringFallback(parameter, fallback) {
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

    Guard.namedFunction = function namedFunction(parameter, parameterName, length) {
        if (parameter === undefined) {
            throw new TypeError("{0} must not be undefined".format(parameterName));
        }

        if (parameter === null) {
            throw new TypeError("{0} must not be null".format(parameterName));
        }

        if (typeof parameter !== "function") {
            throw new TypeError("{0} must be a function".format(parameterName));
        }

        if (parameter.length !== length) {
            throw new TypeError("{0} must be a function with {1} parameters not {2}".format(parameterName, length, parameter.length));
        }

        //not working in ie
        //if (parameter.name === undefined || parameter.name === "" || parameter.name === null) {
        //    throw new TypeError("{0} must be a function with a name".format(parameterName, length, parameter.length));
        //}

        return parameter;
    };

    Guard.handleError = function handleError(context, func, rethrow) {
        if (Guard.isUnitTesting) {
            Guard.namedFunction(func, "func", 1);
            func(context);
            return true;
        }

        try {
            Guard.namedFunction(func, "func", 1);
            func(context);
            return true;
        } catch (ex) {

            var exmsg = "";
            if (ex.message) {
                exmsg += ex.message;
            }
            if (ex.stack) {
                exmsg += ' | stack: ' + ex.stack;
            }

            alert("{0} failed. {1}".format(func.name, ex.message));
            console.log(exmsg);

            if (rethrow) {
                throw ex;
            }

            return false;
        }
    };

    return Guard;
});