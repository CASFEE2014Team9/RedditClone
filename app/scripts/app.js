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

  var inj = angular.injector().get;

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
    .controller('testController', ['Repository', function (Repository) {
      var userRepository = new Repository('user');
      userRepository.getAll().then(function (users) {

      });

      userRepository.get(2).then(function (user) {

      });

      userRepository.post({
        name : 'test',
        email : 'test@test.com',
        password : 'test'
      }).then(function (user) {

      });
    }]);
}());