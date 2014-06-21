
/*jslint browser: true*/
/*global window, requirejs, define, alert */

(function () {
    'use strict';

    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.removeByIndex = function (array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };

    // Remove the second item from the array
    //array.removeByIndex(1);
    // Remove the second-to-last item from the array
    //array.removeByIndex(-2);
    // Remove the second and third items from the array
    //array.removeByIndex(1,2);
    // Remove the last and second-to-last items from the array
    //array.removeByIndex(-2,-1);

    Array.prototype.removeItem = function (array, item) {
        array.splice(array.indexOf(item), 1);
    };

    Array.prototype.contains = function (array, item) {
        return array.indexOf(item) >= 0;
    };
}());