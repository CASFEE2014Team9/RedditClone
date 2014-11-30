
/*jslint browser: true*/
/*global angular */

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
      'LocalStorageModule',
      'repository',
      'session',
      'ui.bootstrap'
    ]);

  redditcloneApp
    .config(function config($routeProvider, localStorageServiceProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'PostsCtrl'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .when('/new', {
          templateUrl: 'views/newpost.html',
          controller: 'PostsCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

      localStorageServiceProvider
        .setPrefix('redditClone');
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
    .factory('history', function ($rootScope, $location) {
      var back = function back() {
        var prevUrl = history.stack.length > 1 ? history.stack.splice(-2)[0] : '/';
        $location.path(prevUrl);
      };

      var history = {
        stack : [],
        back : back
      };

      $rootScope.$on('$routeChangeSuccess', function() {
        history.stack.push($location.$$path);
      });

      $rootScope.back = back;

      return history;
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
    /*jshint unused: false*/
    .run(function (history, session) {
    });

    /*jshint unused: true*/
}());
