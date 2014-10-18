
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
    .controller('PostsCtrl', ['$window', '$scope', '$q', 'postRepository', function ($window, $scope, $q, postRepository) {
      $scope.posts = postRepository.getAll().then(function (data) {
        $scope.posts = data;
      });
    }])
    .controller('PostCtrl', ['$scope', '$injector', function ($scope, $injector) {
      var userRepository = $injector.get('userRepository');
      var commentRepository = $injector.get('commentRepository');
      var ratingRepository = $injector.get('ratingRepository');

      userRepository.get($scope.post.userId).then(function (user) {
        $scope.post.user = user;
      });
      commentRepository.getMatching('postId', $scope.post.id).then(function (comments) {
        $scope.post.comments = comments;
      });
      ratingRepository.getMatching('postId', $scope.post.id).then(function (ratings) {
        $scope.post.ratings = ratings;
      });

      $scope.$watch('post.ratings', function (newValue, oldValue) {
        if (!newValue) {
          return;
        }

        var score = 0;
        newValue.forEach(function (item) {
          score = score + parseInt(item.score);
        });
        $scope.post.score = score;
      }, true);
    }])
    .controller('EditCtrl', ['$window', '$location', '$scope', 'localStorageService', 'session', 'postRepository', function ($window, $location, $scope, localStorageService, session, repository) {
      // load 'post' form information from local storage
      $scope.post = localStorageService.get('postForm');

      // callback function -> if 'post' form data changed
      var onDataChanged = function (newValue, oldValue) {
        if ($scope.post === undefined) {
          return;
        }

        // save 'post' form information in local storage
        localStorageService.set('postForm', $scope.post);
      };

      // 'watch' (->call callback if data changed) post form changes
      $scope.$watch('post.url', onDataChanged);
      $scope.$watch('post.description', onDataChanged);

      // save 'url' and 'description' of post form page
      // called from 'newpost.html'...
      $scope.create = function () {
        // check user already logged in...
        if (!session.isLoggedIn()) {
          // ...if not, open login page
          $location.path('/login');
          return;
        }

        // ... otherwise get user id
        $scope.post.userId = session.user.data.id;

        // update post (data)
        repository.post($scope.post);

        // clear 'post' form and local storage
        $scope.post = {};
        localStorageService.remove('postForm');

        // go back to where you came from
        $location.path('/');
      };

      // cancel creating new post, go back to last page
      // called from 'newpost.html'...
      $scope.cancel = function () {
        // clear local storage
        localStorageService.remove('postForm');

        // go back to last page
        $window.history.back();
      };
    }])
    .controller('VoteCtrl', ['$location', '$scope', 'session', 'ratingRepository', function ($location, $scope, session, repository) {
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
        rating.postId = $scope.post.id;
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
        rating.postId = $scope.post.id;
        rating.score = -1;
        repository.post(rating);
      };
    }]);
}());
