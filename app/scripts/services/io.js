
/*jslint browser: true*/
/*global angular, io */

(function () {
  'use strict';
  var ioModule = angular.module('io', []);

  ioModule
    .factory('io', function () {
      return io;
    });
}());
