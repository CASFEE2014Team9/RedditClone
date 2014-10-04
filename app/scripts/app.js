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
      'repository'
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
          promise.then(function (data) {
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
        var postRepository = $injector.get('postRepository');
        var commentRepository = $injector.get('commentRepository');
        var ratingRepository = $injector.get('ratingRepository');

        lazy(postRepository.getMatching('userId', obj.id), function (l) { obj.posts = l; });
        lazy(commentRepository.getMatching('userId', obj.id), function (l) { obj.comments = l; });
        lazy(ratingRepository.getMatching('userId', obj.id), function (l) { obj.ratings = l; });
      });
    }])
    .factory('postRepository', ['$injector', 'Repository', 'lazy', function ($injector, Repository, lazy) {
      return new Repository('post', function (obj) {
        var userRepository = $injector.get('userRepository');
        var commentRepository = $injector.get('commentRepository');
        var ratingRepository = $injector.get('ratingRepository');

        lazy(userRepository.get(obj.userId), function (l) { obj.user = l; });
        lazy(commentRepository.getMatching('postId', obj.id), function (l) { obj.comments = l; });
        lazy(ratingRepository.getMatching('postId', obj.id), function (l) { obj.ratings = l; });
      });
    }])
    .factory('commentRepository', ['$injector', 'Repository', 'lazy', function ($injector, Repository, lazy) {
      return new Repository('comment', function (obj) {
        var userRepository = $injector.get('userRepository');
        var postRepository = $injector.get('postRepository');

        lazy(userRepository.get(obj.userId), function (l) { obj.user = l; });
        lazy(postRepository.get(obj.postId), function (l) { obj.post = l; });
      });
    }])
    .factory('ratingRepository', ['$injector', 'Repository', 'lazy', function ($injector, Repository, lazy) {
      return new Repository('rating', function (obj) {
        var userRepository = $injector.get('userRepository');
        var postRepository = $injector.get('postRepository');

        lazy(userRepository.get(obj.userId), function (l) { obj.user = l; });
        lazy(postRepository.get(obj.postId), function (l) { obj.post = l; });
      });
    }]);
}());