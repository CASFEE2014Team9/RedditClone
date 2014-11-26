
/*jslint browser: true*/
/*global window, angular, io */

(function () {
  'use strict';
  var ioModule = angular.module('io', []);

  ioModule
    .factory('io', function () {
      return io;
    });
}());