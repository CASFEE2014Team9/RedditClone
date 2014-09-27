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
        link: function (scope, element, attrs, controller) {
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
  .factory('userRepository', ['Repository', function (Repository) {
      return new Repository('user');
    }])
    .factory('postRepository', ['Repository', function (Repository) {
      return new Repository('post');
    }])
    .factory('commentRepository', ['Repository', function (Repository) {
      return new Repository('comment');
    }])
    .factory('ratingRepository', ['Repository', function (Repository) {
      return new Repository('rating');
    }])
    .controller('testController', ['userRepository', function (userRepository) {

    }]);
}());