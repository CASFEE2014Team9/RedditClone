
/*jslint browser: true*/
/*global angular */

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
    }).factory('session', function ($q, userRoles, $rootScope, $injector, history) {

      var user = {
        role : userRoles.public,
        name : 'anonymous',
        password : '',
        data : null
      };

      var session = {
        user : user,
        isLoggedIn: function () {
          return user.role === userRoles.user || user.role === userRoles.admin;
        },
        login : function () {
          var userRepository = $injector.get('userRepository');
          var history = $injector.get('history');
          return userRepository.getFirstMatching('name', user.name).then(function (data) {
            if (user.password === data.password) {
              user.data = data;
              user.role = userRoles.user;
              history.back();
              return user;
            }
          }, function (data) {
            return $q.reject(data);
          });
        }
      };

      $rootScope.session = session;

      return session;
    });
}());