

'use strict';
var customMatchers = {
  //sample matcher from http://jasmine.github.io/2.0/custom_matcher.html
  toBeGoofy: function (util, customEqualityTesters) {
    return {
      compare: function (actual, expected) {
        if (expected === undefined) {
          expected = '';
        }
        var result = {};

        result.pass = util.equals(actual.hyuk, "gawrsh" + expected, customEqualityTesters);
        if (result.pass) {
          result.message = "Expected " + actual + " not to be quite so goofy";
        } else {
          result.message = "Expected " + actual + " to be goofy, but it was not very goofy";
        }
        return result;
      }
    };
  },
  anyItemMatchProperty: function (util, customEqualityTesters) {
    return {
      compare: function (actual, expected) {
        var property = 'undefined';
        var value;

        if (expected !== undefined) {
          property = expected.property;
          value = expected.value;
        }
        var result = {};

        result.pass = !util.equals(value, undefined, customEqualityTesters);
        if (!result.pass) {
          return result;
        }

        result.pass = !util.equals(property, 'undefined', customEqualityTesters);
        if (!result.pass) {
          return result;
        }

        /*
        TODO not yet found a working check if item is an array
        result.pass = Array.isArray(actual);
        if (!result.pass) {
          return result;
        }
        */

        var found = false;
        actual.forEach(function (item) {
          found = found || util.equals(item[property], value, customEqualityTesters);
        });

        result.pass = found;
        if (result.pass) {
        } else {
        }
        return result;
      }
    };
  },
  allItemsMatchProperty: function (util, customEqualityTesters) {
    return {
      compare: function (actual, expected) {
        var property = 'undefined';
        var value;

        if (expected !== undefined) {
          property = expected.property;
          value = expected.value;
        }
        var result = {};

        result.pass = !util.equals(value, undefined, customEqualityTesters);
        if (!result.pass) {
          return result;
        }

        result.pass = !util.equals(property, 'undefined', customEqualityTesters);
        if (!result.pass) {
          return result;
        }

        /*
         TODO not yet found a working check if item is an array
         result.pass = Array.isArray(actual);
         if (!result.pass) {
         return result;
         }
         */

        var match = true;
        actual.forEach(function (item) {
          match = match && util.equals(item[property], value, customEqualityTesters);
        });

        result.pass = match;
        if (result.pass) {
        } else {
        }
        return result;
      }
    };
  }
};