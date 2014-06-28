
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function (requrie) {
    'use strict';

    var Guard = requrie("Guard");

    function List(elementType) {
        this.items = [];
        this.elementType = elementType;
    }

    // Array Remove - By John Resig (MIT Licensed)
    List.prototype.removeByIndex = function removeByIndex(from, to) {
        var rest = this.items.slice((to || from) + 1 || this.items.length);
        this.items.length = from < 0 ? this.items.length + from : from;
        return this.items.push.apply(this.items, rest);
    };

    List.prototype.add = function add(item) {
        if (this.elementType !== undefined) {
            Guard.customType(item, "item", this.elementType);
        }
        this.items.push(item);
    };

    List.prototype.remove = function remove(item) {
        this.items.splice(this.items.indexOf(item), 1);
    };

    List.prototype.contains = function contains(item) {
        return this.items.indexOf(item) >= 0;
    };

    List.prototype.count = function count() {
        return this.items.length;
    };

    return List;
});