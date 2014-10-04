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
    .controller('CommentCtrl', ['$scope', 'commentRepository', 'session', function ($scope, commentRepository, session) {
      $scope.addComment = function () {
        $scope.comment.postId = $scope.post.id;
        $scope.comment.userId = session.user.userId;

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
