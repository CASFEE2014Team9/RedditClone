
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
    }).factory('session', function ($q, $rootScope, $injector, $cookies, userRoles, history) {

      var user = {
        role : userRoles.public,
        name : 'anonymous',
        password : '',
        data : null
      };

      var login = function () {
        var userRepository = $injector.get('userRepository');
        return userRepository.getFirstMatching('name', user.name).then(function (data) {
          if (user.password === data.password) {
            user.data = data;
            user.role = userRoles.user;


            return user;
          }

          return $q.reject(data);
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
          login().then(function (data) {
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
        }
      };

      if ($cookies.user) {
        user.name = $cookies.user;
        user.password = $cookies.password;
        login();
      }

      $rootScope.session = session;

      return session;
    });
}());