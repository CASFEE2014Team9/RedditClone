
/*global describe, beforeEach, afterEach, it, expect, inject */

'use strict';

describe('Controller: CommentCtrl', function () {

  // load the controller's module
  beforeEach(module('redditcloneApp'));

  var scope,
    $httpBackend,
    $controller;

  var comment = {
    userId : 1,
    postId : 1,
    createdAt : '2014-11-09T14:44:57.974Z'
  };

  var user = {
    "name": "Someone",
    "email": "something@somewhere.com",
    "id": "1"
  };

  var post = {
    "url": "http://espn.go.com",
    "description": "Sport site",
    "userId": "1",
    "createdAt": "\"2014-11-09T14:44:57.974Z\"",
    "id": "1"
  };

  // override io here
  module(function ($provide) {
    $provide.factory('io', {
      on : function () {}
    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope) {
    inject(function ($injector) {
      $controller =  $injector.get('$controller');
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend.when('GET', 'http://localhost:8080/data/users/')
        .respond({
          "ret" : "success",
          "data": { "1": user }
        });

      $httpBackend.when('GET', 'http://localhost:8080/data/posts/')
        .respond({
          "ret" : "success",
          "data": { "1": post }
        });
    });

    scope = $rootScope.$new();
    scope.comment = comment;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch comment related data to the scope', function () {
    inject(function () {

      $httpBackend.expectGET('http://localhost:8080/data/users/');
      $httpBackend.expectGET('http://localhost:8080/data/posts/');

      var controller = $controller('CommentCtrl', {
        $scope: scope
      });

      $httpBackend.flush();

      var convertedDate = new Date(comment.createdAt);
      expect(scope.createdAt.getTime()).toBe(convertedDate.getTime());

      expect(scope.comment.post).not.toBe(null);
      expect(scope.comment.post.id).toBe(post.id);
      expect(scope.comment.post.url).toBe(post.url);
      expect(scope.comment.post.description).toBe(post.description);
      expect(scope.comment.post.userId).toBe(post.userId);
      expect(scope.comment.post.createdAt).toBe(post.createdAt);

      expect(scope.comment.user).not.toBe(null);
      expect(scope.comment.user.id).toBe(user.id);
      expect(scope.comment.user.name).toBe(user.name);
      expect(scope.comment.user.email).toBe(user.email);
    });
  });
});
