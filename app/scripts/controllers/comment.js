
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
      var userRepository = $injector.get('userRepository');
      var commentRatingRepository = $injector.get('commentRatingRepository');

      userRepository.get($scope.comment.userId).then(function (user) {
        $scope.comment.user = user;
      });
      commentRatingRepository.getMatching('commentId', $scope.comment.id).then(function (ratings) {
        $scope.comment.ratings = ratings;
      });

      $scope.$watch('comment.ratings', function (newValue) {
        if (!newValue) {
          return;
        }

        var score = 0;
        newValue.forEach(function (item) {
          score = score + parseInt(item.score);
        });
        $scope.comment.score = score;
      }, true);

      if ($scope.comment.createdAt) {
        try {
          $scope.createdAt = new Date(JSON.parse($scope.comment.createdAt));
        } catch (ignore) {
          $scope.createdAt = $scope.comment.createdAt;
        }
      }
    }])
    .controller('CommentEditCtrl', ['$scope', '$location', 'session', 'localStorageService', 'commentRepository', function ($scope, $location, session, localStorageService, commentRepository) {
      $scope.post = undefined;
      $scope.comment = {};

      $scope.addComment = function () {
        if (!session.isLoggedIn()) {
          $location.path('/login');
          return;
        }

        $scope.comment.postId = $scope.post.id;
        $scope.comment.userId = session.user.data.id;
        $scope.comment.createdAt = JSON.stringify(new Date());

        // update stuff
        commentRepository.post($scope.comment);

        // clear input
        $scope.comment = {};

        // clear local storage
        localStorageService.remove($scope.post.id + 'editComment');

        // close accordion group 'add'
        $scope.status.openAdd = !$scope.status.openAdd;
      };

      $scope.cancel = function () {
        // close accordion group 'add'
        $scope.status.openAdd = !$scope.status.openAdd;
      };

      $scope.$watch('post', function () {
        // if a post is known we can try to load stored comment
        $scope.comment = localStorageService.get($scope.post.id + 'editComment');
      });

      var onDataChanged = function () {
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
      };

      //store the input for each post
      $scope.$watch('comment.comment', onDataChanged);
    }])
    .controller('CommentVoteCtrl', ['$location', '$scope', 'session', 'commentRatingRepository', function ($location, $scope, session, repository) {
      $scope.voteUp = function () {
        // check user already logged in...
        if (!session.isLoggedIn()) {
          // ...if not, open login page
          $location.path('/login');
          return;
        }

        // create new rating, with score '1'
        var rating = {};
        rating.userId = session.user.data.id;
        rating.commentId = $scope.comment.id;
        rating.score = 1;
        repository.post(rating);
      };

      $scope.voteDown = function () {
        // check user already logged in...
        if (!session.isLoggedIn()) {
          // ...if not, open login page
          $location.path('/login');
          return;
        }

        // create new rating, with score '-1'
        var rating = {};
        rating.userId = session.user.data.id;
        rating.commentId = $scope.comment.id;
        rating.score = -1;
        repository.post(rating);
      };

      $scope.$watch('comment.ratings', function (newValue) {
        if (!newValue) {
          return;
        }
        var upRatingDisabled = false;
        var downRatingDisabled = false;
        var upRatingId = 0;
        var downRatingId = 0;

        if (session.isLoggedIn()) {
          newValue.forEach(function (item) {
            if (item.userId === session.user.data.id) {
              if (item.score === 1) {
                upRatingDisabled = true;
                upRatingId = item.id;
              }
              if (item.score === -1) {
                downRatingDisabled = true;
                downRatingId = item.id;
              }

              if (upRatingDisabled && downRatingDisabled) {
                repository.delete(upRatingId);
                upRatingDisabled = false;

                repository.delete(downRatingId);
                downRatingDisabled = false;
              }
            }
          });
        } else {
          upRatingDisabled = true;
          downRatingDisabled = true;
        }

        $scope.upRatingDisabled = upRatingDisabled;
        $scope.downRatingDisabled = downRatingDisabled;

      }, true);
    }]);
}());
