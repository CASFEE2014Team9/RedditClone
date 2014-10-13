
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
    .controller('UsersCtrl', ['$scope', 'userRepository', function ($scope, userRepository) {
      userRepository.getAll().then(function (data) {
        $scope.posts = data;
      });
    }])
    .controller('UserCtrl', ['$scope', '$injector', function ($scope, $injector) {
      var postRepository = $injector.get('postRepository');
      var commentRepository = $injector.get('commentRepository');
      var ratingRepository = $injector.get('ratingRepository');

      postRepository.getMatching('userId', $scope.user.id).then(function (posts) {
        $scope.post.posts = posts;
      });
      commentRepository.getMatching('userId', $scope.user.id).then(function (comments) {
        $scope.post.comments = comments;
      });
      ratingRepository.getMatching('userId', $scope.user.id).then(function (ratings) {
        $scope.post.ratings = ratings;
      });
    }]);
}());