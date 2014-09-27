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
    var self = this;
    this.comment = {};
    $scope.addComment = function (post) {
      self.comment.postId = post.id;
      //self.comment.userId = ???

      self.comment.userId = post.userId;
      commentRepository.post(self.comment);

      //post.comments.push(self.comment);
    };
    this.comment = {};
    $scope.comments = [ ];
    $scope.comment = this.comment;
    commentRepository.getAll().then(function (data) {
      $scope.comments = data;
    });
  }]);
