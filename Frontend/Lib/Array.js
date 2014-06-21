
/*jslint browser: true*/
/*global window, requirejs, define, alert */

(function () {
    'use strict';

    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.removeByIndex = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    // Remove the second item from the array
    //array.removeByIndex(1);
    // Remove the second-to-last item from the array
    //array.removeByIndex(-2);
    // Remove the second and third items from the array
    //array.removeByIndex(1,2);
    // Remove the last and second-to-last items from the array
    //array.removeByIndex(-2,-1);

    Array.prototype.removeItem = function (item) {
        this.splice(this.indexOf(item), 1);
    };

    Array.prototype.contains = function (item) {
        return this.indexOf(item) >= 0;
    };
}());