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
    .factory('userRepository', ['$injector', 'Repository', function ($injector, Repository) {
      return new Repository('user', function (obj) {
        var postRepository = $injector.get('postRepository');
        var commentRepository = $injector.get('commentRepository');
        var ratingRepository = $injector.get('ratingRepository');

        obj.posts = postRepository.getMatching(obj.postId).then(function (data) {
          obj.posts = data;
        });
        obj.comments = commentRepository.getMatching(obj.postId).then(function (data) {
          obj.comments = data;
        });
        obj.ratings = ratingRepository.getMatching(obj.postId).then(function (data) {
          obj.ratings = data;
        });
      });
    }])
    .factory('postRepository', ['$injector', 'Repository', function ($injector, Repository) {
      return new Repository('post', function (obj) {
        var userRepository = $injector.get('userRepository');
        var commentRepository = $injector.get('commentRepository');
        var ratingRepository = $injector.get('ratingRepository');

        obj.user = userRepository.get(obj.userId).then(function (data) {
          obj.user = data;
        });
        obj.comments = commentRepository.getMatching(obj.postId).then(function (data) {
          obj.comments = data;
        });
        obj.ratings = ratingRepository.getMatching(obj.postId).then(function (data) {
          obj.ratings = data;
        });
      });
    }])
    .factory('commentRepository', ['$injector', 'Repository', function ($injector, Repository) {
      return new Repository('comment', function (obj) {
        var userRepository = $injector.get('userRepository');
        var postRepository = $injector.get('postRepository');

        obj.user = userRepository.get(obj.userId).then(function (data) {
          obj.user = data;
        });
        obj.post = postRepository.get(obj.postId).then(function (data) {
          obj.post = data;
        });
      });
    }])
    .factory('ratingRepository', ['$injector', 'Repository', function ($injector, Repository) {
      return new Repository('rating', function (obj) {
        var userRepository = $injector.get('userRepository');
        var postRepository = $injector.get('postRepository');

        obj.user = userRepository.get(obj.userId).then(function (data) {
          obj.user = data;
        });
        obj.post = postRepository.get(obj.postId).then(function (data) {
          obj.post = data;
        });
      });
    }])
    .controller('testController', ['userRepository', function ($injector, userRepository) {

    }]);
}());