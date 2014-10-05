
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
    .controller('LoginCtrl', ['$scope', '$rootScope', 'session', 'userRoles', function ($scope, $rootScope, session, userRoles) {
      if ($rootScope.session.user.name === 'anonymous') {
        $rootScope.session.user.name = '';
        $rootScope.session.user.password = '';
      }
    }]);
}());
