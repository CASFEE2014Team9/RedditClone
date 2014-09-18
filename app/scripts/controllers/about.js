'use strict';

/**
 * @ngdoc function
 * @name redditcloneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redditcloneApp
 */
angular.module('redditcloneApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
