
/*jslint browser: true*/
/*global window, angular */

(function () {
  'use strict';
  var sessionModule = angular.module('session', []);

  sessionModule
    .factory('session', function () {
      var session = {
        user : null
      };

      return session;
    });
}());