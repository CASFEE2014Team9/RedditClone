'use strict';

/**
 * @ngdoc function
 * @name redditcloneApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the redditcloneApp
 */
angular.module('redditcloneApp')
  .controller('PostsCtrl', ['$http', '$scope', function ($http, $scope) {
    $scope.posts = [ ];
    $http.get('/data/posts').success(function (data) {
        $scope.posts = data;
    });
  } ]);
