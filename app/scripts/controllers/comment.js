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
    this.comment = {};
    this.addComment = function (post) {
      post.comments.push(this.comment);
    };
    this.comment = {};
    $scope.comments = [ ];
    commentRepository.getAll().then(function (data) {
      $scope.comments = data;
    });
  } ]);
