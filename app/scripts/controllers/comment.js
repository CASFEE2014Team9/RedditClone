
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
    .controller('CommentsCtrl', ['$scope', 'commentRepository', function ($scope, commentRepository) {
      commentRepository.getAll().then(function (comments) {
        $scope.comments = comments;
      });
    }])
    .controller('CommentCtrl', ['$scope', '$injector', function ($scope, $injector) {
      var postRepository = $injector.get('postRepository');
      var userRepository = $injector.get('userRepository');

      userRepository.get($scope.comment.userId).then(function (user) {
        $scope.comment.user = user;
      });
      postRepository.get($scope.comment.postId).then(function (post) {
        $scope.comment.post = post;
      });
    }])
    .controller('CommentEditCtrl', ['$scope', '$location', 'session', 'localStorageService', 'commentRepository', function ($scope, $location, session, localStorageService, commentRepository) {
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

      $scope.$watch('post', function (newValue, oldValue) {
        // if a post is known we can try to load stored comment
        $scope.comment = localStorageService.get($scope.post.id + 'editComment');
      });

      $scope.post = undefined;
      $scope.comment = {};

      //store the input for each post
      $scope.$watch('comment.comment', function (newValue, oldValue) {
        if (!$scope.post) {
          return;
        }
        if (!$scope.comment) {
          return;
        }
        if (!$scope.comment.comment) {
          return;
        }

        localStorageService.set($scope.post.id + 'editComment', $scope.comment);
      });
    }]);
}());
