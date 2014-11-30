
/*jslint browser: true*/
/*global angular, alert */
/* jshint bitwise: false */

(function () {
  'use strict';
  var sessionModule = angular.module('session', []);

  // bulld with help of
  //http://frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/

  sessionModule
    .factory('userRoles', function () {
      return {
        public: 1, // 001
        user:   2, // 010
        admin:  4  // 100
      };
    }).factory('accessLevels', function (userRoles) {
      return {
        public: userRoles.public | // 111
                userRoles.user   |
                userRoles.admin,
        anon:   userRoles.public,  // 001
        user:   userRoles.user   | // 110
                userRoles.admin,
        admin:  userRoles.admin    // 100
      };
    }).factory('session', function ($q, $rootScope, $injector, $cookies, userRoles, history, $http) {

      var user = {
        role : userRoles.public,
        name : 'anonymous',
        password : '',
        data : null
      };

      var login = function () {
        var loc = window.location;
        var url = loc.origin + loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1) + 'login';

        return $http.post(url, {
          credentialsUser : user.name,
          credentialsPassword : user.password
        }).then(function (data) {
          user.data = data.data.data;
          user.role = userRoles.user;

          if (user.data.role) {
            user.role = user.data.role;
          }

          return user;
        }, function (data) {
          return $q.reject(data);
        });
      };

      var session = {
        user : user,
        isLoggedIn: function () {
          return user.role === userRoles.user || user.role === userRoles.admin;
        },
        login : function () {
          return login().then(function (data) {
            $cookies.user = user.name;
            $cookies.password = user.password;
            history.back();
            return data;
          }, function (data) {
            alert('login failed');
            return $q.reject(data);
          });
        },
        logout : function () {
          delete $cookies.user;
          delete $cookies.password;
          user.data = undefined;
          user.name = '';
          user.password = '';
          user.role = userRoles.public;
        },
        authorize: function (accessLevel) {
          return (accessLevel & user.role) > 0;
        }
      };

      if ($cookies.user) {
        user.name = $cookies.user;
        user.password = $cookies.password;
        login();
      }

      $rootScope.session = session;

      return session;
    })
    .directive('ownsOrAdminToEnable', ['$parse', 'session', 'accessLevels', function ownsOrAdminToEnableDirective($parse, session, accessLevels) {
      return {
        restrict: 'A', // only attributes
        link: function (scope, el, attrs) {
          scope.$watch(attrs.ownsOrAdminToEnable, function (newValue) {
            if (!newValue) {
              return;
            }
            // the logged in user must either own the specified item or must be admin
            // so the action on the element can be performed
            var enabled = session.isLoggedIn();
            if (enabled) {
              enabled = session.user.data.id === newValue.userId || session.authorize(accessLevels.admin);
            }

            el.prop('disabled', !enabled);
          });
        }
      };
    }]);
}());