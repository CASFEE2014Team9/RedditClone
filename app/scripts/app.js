
/*jslint browser: true*/
/*global window, angular */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name redditcloneApp
   * @description
   * # redditcloneApp
   *
   * Main module of the application.
   */
  var redditcloneApp = angular
    .module('redditcloneApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'services'
    ]);

  redditcloneApp
    .config(function config($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        })
        .when('/comment', {
          templateUrl: 'views/comment.html',
          controller: 'CommentCtrl'
        })
        .when('/posts', {
          templateUrl: 'views/posts.html',
          controller: 'PostsCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .directive('activeLink', ['$location', function activeLinkDirective(location) {
      return {
        restrict: 'A', // only attributes
        link: function (scope, element, attrs) {
          var clazz = attrs.activeLink;
          var path = attrs.href;
          path = path.substring(1); //hack because path does not return including hashbang
          scope.location = location;
          scope.$watch('location.path()', function (newPath) {
            if (path === newPath) {
              element.addClass(clazz);
            } else {
              element.removeClass(clazz);
            }
          });
        }
      };
    }])
    .directive('transfer', function transferDirective() {
      return {
        restrict: 'A', // only attributes
        scope: true,
        link: function (scope, el, attrs) {
          var transfer = attrs.transfer;
          scope[transfer] = scope.$parent[transfer];
        }
      };
    })
    .factory('lazy', function () {
      var lazy = function (promise, assign) {
        assign(function () {
          promise().then(function (data) {
            assign(function () {
              return data;
            });
          });
          return null;
        });
      };
      return lazy;
    })
    .factory('userRepository', ['$injector', 'Repository', 'lazy', function ($injector, Repository, lazy) {
      return new Repository('user', function (obj) {

        lazy(function () {
          var postRepository = $injector.get('postRepository');
          return postRepository.getMatching('userId', obj.id);
        }, function (l) { obj.posts = l; });

        lazy(function () {
          var commentRepository = $injector.get('commentRepository');
          return commentRepository.getMatching('userId', obj.id);
        }, function (l) { obj.comments = l; });

        lazy(function () {
          var ratingRepository = $injector.get('ratingRepository');
          return ratingRepository.getMatching('userId', obj.id);
        }, function (l) { obj.ratings = l; });
      });
    }])
    .factory('postRepository', ['$injector', 'Repository', 'lazy', function ($injector, Repository, lazy) {
      return new Repository('post', function (obj) {

        lazy(function () {
          var userRepository = $injector.get('userRepository');
          return userRepository.get(obj.userId);
        }, function (l) { obj.user = l; });

        lazy(function () {
          var commentRepository = $injector.get('commentRepository');
          return commentRepository.getMatching('postId', obj.id);
        }, function (l) { obj.comments = l; });

        lazy(function () {
          var ratingRepository = $injector.get('ratingRepository');
          return ratingRepository.getMatching('postId', obj.id);
        }, function (l) { obj.ratings = l; });
      });
    }])
    .factory('commentRepository', ['$injector', 'Repository', 'lazy', function ($injector, Repository, lazy) {
      return new Repository('comment', function (obj) {

        lazy(function () {
          var userRepository = $injector.get('userRepository');
          return userRepository.get(obj.userId);
        }, function (l) { obj.user = l; });

        lazy(function () {
          var postRepository = $injector.get('postRepository');
          return postRepository.get(obj.postId);
        }, function (l) { obj.post = l; });
      });
    }])
    .factory('ratingRepository', ['$injector', 'Repository', 'lazy', function ($injector, Repository, lazy) {
      return new Repository('rating', function (obj) {

        lazy(function () {
          var userRepository = $injector.get('userRepository');
          return userRepository.get(obj.userId);
        }, function (l) { obj.user = l; });

        lazy(function () {
          var postRepository = $injector.get('postRepository');
          return postRepository.get(obj.postId);
        }, function (l) { obj.post = l; });
      });
    }]);
}());