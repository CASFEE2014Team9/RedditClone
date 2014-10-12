
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
    .controller('CommentCtrl', [
      '$scope',
      '$location',
      'commentRepository',
      'session',
      'localStorageService',
      function ($scope, $location, commentRepository, session, localStorageService) {
        $scope.addComment = function () {
          if (!session.isLoggedIn()) {
            $location.path('/login');
            return;
          }

          $scope.comment.postId = $scope.post.id;
          $scope.comment.userId = session.user.data.id;

          // update stuff
          commentRepository.post($scope.comment);

          // clear input
          $scope.comment = {};

          // clear local storage
          localStorageService.remove($scope.post.id + 'editComment');
        };

        $scope.post = undefined;
        $scope.comment = {};

        $scope.$watch('post', function (newValue, oldValue) {
          // if a post is known we can try to load stored comment
          $scope.comment = localStorageService.get($scope.post.id + 'editComment');
        });

        //store the input for each post
        $scope.$watch('comment.comment', function (newValue, oldValue) {
          if ($scope.post === undefined) {
            return;
          }
          if ($scope.comment.comment === undefined) {
            return;
          }

          localStorageService.set($scope.post.id + 'editComment', $scope.comment);
        });

        $scope.comments = commentRepository.getAll().then(function (data) {
          $scope.comments = data;
        });
    }]);
}());
