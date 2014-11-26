
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
      $scope.posts = [];
      $scope.visiblePosts = [];
      $scope.maxVisiblePages = 5;
      $scope.currentPage = 0;
      $scope.postsPerPage = 5;

      postRepository.getAll().then(function (data) {
        $scope.posts = data;
        $scope.currentPage = 1;
      });

      var updatePosts = function (posts, currentPage) {
        if (!currentPage) {
          return;
        }

        if (!posts) {
          return;
        }

        var start = (currentPage - 1) * $scope.postsPerPage;
        var end = start + $scope.postsPerPage;

        $scope.visiblePosts = posts.slice(start, end);
        $scope.numPages = Math.ceil($scope.posts.length / $scope.postsPerPage);
      };

      $scope.$watch('currentPage', function (newValue) {
        updatePosts($scope.posts, newValue);
      }, true);

      $scope.$watch('posts', function (newValue) {
        updatePosts(newValue, $scope.currentPage);
      }, true);

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

      $scope.$watch('post.ratings', function (newValue) {
        if (!newValue) {
          return;
        }

        var score = 0;
        newValue.forEach(function (item) {
          score = score + parseInt(item.score);
        });
        $scope.post.score = score;
      }, true);


      $scope.delete = function () {
        var postRepository = $injector.get('postRepository');
        postRepository.delete($scope.post.id);
      };

      if ($scope.post.createdAt) {
        try {
          $scope.createdAt = new Date(JSON.parse($scope.post.createdAt));
        } catch (ignore) {
          $scope.createdAt = $scope.post.createdAt;
        }
      }
    }])
    .controller('EditCtrl', ['$window', '$location', '$scope', 'localStorageService', 'session', 'postRepository', function ($window, $location, $scope, localStorageService, session, repository) {
      // load 'post' form information from local storage
      $scope.post = localStorageService.get('postForm');

      // callback function -> if 'post' form data changed
      var onDataChanged = function () {
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
        $scope.post.createdAt = JSON.stringify(new Date());

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

      $scope.$watch('post.ratings', function (newValue) {
        if (!newValue) {
          return;
        }
        var ratingDisabled = false;

        if (session.isLoggedIn()) {
          newValue.forEach(function (item) {
            if (item.userId === session.user.data.id) {
              ratingDisabled = true;
            }
          });
        } else {
          ratingDisabled = true;
        }

        $scope.ratingDisabled = ratingDisabled;

      }, true);

    }]);
}());
