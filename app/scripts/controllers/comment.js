'use strict';

/**
 * @ngdoc function
 * @name redditcloneApp.controller:CommentCtrl
 * @description
 * # CommentCtrl
 * Controller of the redditcloneApp
 */
angular.module('redditcloneApp')
  .controller('CommentCtrl', ['$http', '$scope', function ($http, $scope) {
    this.comment = {};
    this.addComment = function(post) {
      post.comments.push(this.comment);
    };
    this.comment = {};
    $scope.comments = [ ];
    $http.get('/data/comments').success(function (data) {
        $scope.comments = data;
    });
  } ]);
