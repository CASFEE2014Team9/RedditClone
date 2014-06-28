
/*jslint browser: true*/
/*global window, requirejs, define, alert, parseInt */

(function defineString() {
    'use strict';

    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return args[number] !== undefined ? args[number] : match;
            });
        };
    }
}());

