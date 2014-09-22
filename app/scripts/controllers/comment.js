'use strict';

/**
 * @ngdoc function
 * @name redditcloneApp.controller:CommentCtrl
 * @description
 * # CommentCtrl
 * Controller of the redditcloneApp
 */
angular.module('redditcloneApp')
  .controller('CommentCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.comments = [
      { id: 1, name: "Hoegger", prename: "Andreas", email: "andreas.hoegger@bsiag.com" },
      { id: 2, name: "Dietrich", prename: "Benno", email: "benno.dietrich@soxes.ch" },
    ];
  });
