
/*jslint browser: true*/
/*global angular */

(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name redditcloneApp.controller:PostsCtrl
   * @description
   * # PostsCtrl
   * Controller of the redditcloneApp
   */
  angular.module('redditcloneApp')
    .controller('PostsCtrl', ['$window', '$scope', '$q', 'postRepository', function ($window, $scope, $q, postRepository) {
      $scope.posts = postRepository.getAll().then(function (data) {
        $scope.posts = data;
      });

      $scope.create = function () {
        // save link and description...
      };

      $scope.cancel = function () {
        $window.history.back();
      };
    }]);
}());
