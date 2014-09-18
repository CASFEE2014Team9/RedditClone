'use strict';

/**
 * @ngdoc function
 * @name redditcloneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redditcloneApp
 */
angular.module('redditcloneApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
