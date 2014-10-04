
/*jslint browser: true*/
/*global angular */

(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name redditcloneApp.controller:CommentCtrl
   * @description
   * # CommentCtrl
   * Controller of the redditcloneApp
   */
  angular.module('redditcloneApp')
    .controller('CommentCtrl', ['$scope', '$location', 'commentRepository', 'session', function ($scope, $location, commentRepository, session) {
      $scope.addComment = function () {
        if (!session.isLoggedIn()) {
          $location.path('/login');
        }

        $scope.comment.postId = $scope.post.id;
        $scope.comment.userId = session.user.data.userId;

        commentRepository.post($scope.comment);

        $scope.comment = {};
      };

      $scope.post = undefined;
      $scope.comment = {};

      $scope.comments = commentRepository.getAll().then(function (data) {
        $scope.comments = data;
      });
    }]);
}());
