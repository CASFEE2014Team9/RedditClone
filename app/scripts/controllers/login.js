
/*jslint browser: true*/
/*global angular, alert */

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
    .controller('LoginCtrl', ['$scope', '$rootScope', 'session', 'userRepository', function ($scope, $rootScope, session, userRepository) {
      if ($rootScope.session.user.name === 'anonymous') {
        $rootScope.session.user.name = '';
        $rootScope.session.user.password = '';
      }

      $scope.register = function () {
        userRepository.getMatching('name', $rootScope.session.user.name)
          .then(function (users) {
            if (users.length > 0) {
              alert('username is in use, chose another one');
              return;
            }

            userRepository.post($rootScope.session.user).then(function () {
              session.login();
            });
          });
      };
    }]);
}());
