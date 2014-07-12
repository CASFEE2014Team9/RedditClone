
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function defineList(requrie) {
    'use strict';

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
            var Guard = requrie("Guard");
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

    List.prototype.findByKey = function findByKey(key, value) {
        var i;
        for (i = 0; i < this.items.length; i++) {
            if (this.items[i][key] === value) {
                return this.items[i];
            }
        }
        return null;
    };

    List.prototype.findByPredicate = function findByPredicate(predicate) {
        var i;
        for (i = 0; i < this.items.length; i++) {
            if (predicate(this.items[i])) {
                return this.items[i];
            }
        }
        return null;
    };

    return List;
});