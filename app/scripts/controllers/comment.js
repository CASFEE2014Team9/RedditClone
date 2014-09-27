'use strict';

/**
 * @ngdoc function
 * @name redditcloneApp.controller:CommentCtrl
 * @description
 * # CommentCtrl
 * Controller of the redditcloneApp
 */
angular.module('redditcloneApp')
  .controller('CommentCtrl', ['$scope', 'commentRepository', function ($scope, commentRepository) {
    $scope.addComment = function () {
      $scope.comment.postId = $scope.post.id;
      //self.comment.userId = ???
      $scope.comment.userId = $scope.post.userId;

      commentRepository.post($scope.comment);

      $scope.comment = {};
    };

    $scope.post = {};
    $scope.comment = {};
    $scope.comments = [ ];

    commentRepository.getAll().then(function (data) {
      $scope.comments = data;
    });
  }]);
