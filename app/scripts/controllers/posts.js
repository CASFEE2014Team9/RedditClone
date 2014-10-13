
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
    .controller('PostsCtrl', ['$window', '$scope', '$q', 'postRepository', 'localStorageService', 'session', '$location', function ($window, $scope, $q, postRepository, localStorageService, session, $location) {
      $scope.posts = postRepository.getAll().then(function (data) {
        $scope.posts = data;
      });

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
        postRepository.post($scope.post);

        // clear 'post' form and local storage
        $scope.post = {};
        localStorageService.remove('postForm');
      };

      // cancel creating new post, go back to last page
      // called from 'newpost.html'...
      $scope.cancel = function () {
        // clear local storage
        localStorageService.remove('postForm');
        $window.history.back();
      };
    }])
    .controller('PostCtrl', ['$scope', '$injector', function ($scope, $injector) {
      var userRepository = $injector.get('userRepository');
      var commentRepository = $injector.get('commentRepository');
      var ratingRepository = $injector.get('ratingRepository');

      $scope.post.user = userRepository.get($scope.post.userId).then(function (user) {
        $scope.post.user = user;
      });
      $scope.post.comments = commentRepository.getMatching('postId', $scope.post.id).then(function (comments) {
        $scope.post.comments = comments;
      });
      $scope.post.ratings = ratingRepository.getMatching('postId', $scope.post.id).then(function (ratings) {
        $scope.post.ratings = ratings;
      });

      var scorePromise = function () {
        return ratingRepository.getMatching('postId', $scope.post.id).then(function (ratings) {
          var result = 0;

          ratings.forEach(function (item) {
            result = result + parseInt(item.score);
          });
          return result;
        });
      };

      $scope.post.score = 0;
      scorePromise().then(function (score) {
        $scope.post.score = score;
      });
    }]);
}());
