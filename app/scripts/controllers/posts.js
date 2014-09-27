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
    .controller('PostsCtrl', ['$scope', '$q', 'postRepository', function ($scope, $q, postRepository) {
      $scope.posts = postRepository.getAll().then(function (data) {
        $scope.posts = data;
      });
    }]);
}());
