
/*global describe, beforeEach, afterEach, it, expect, inject,
  setupBackend, post, user, rating, comment */

(function () {
  'use strict';

  describe('Controller: CommentCtrl', function () {

    // load the controller's module
    beforeEach(module('redditcloneApp'));

    var scope,
      $httpBackend,
      $controller;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($rootScope, $injector) {
      $httpBackend =  $injector.get('$httpBackend');
      $controller =  $injector.get('$controller');

      inject(setupBackend);

      scope = $rootScope.$new();
      scope.comment = comment;
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should fetch comment related data to the scope', function () {
      $httpBackend.expectGET('http://localhost:8080/data/users/');
      $httpBackend.expectGET('http://localhost:8080/data/posts/');

      $controller('CommentCtrl', {
        $scope: scope
      });

      $httpBackend.flush();

      var convertedDate = new Date(JSON.parse(comment.createdAt));
      expect(scope.createdAt.getTime()).toBe(convertedDate.getTime());

      expect(scope.comment.post).not.toBe(null);
      expect(scope.comment.post.id).toBe(scope.comment.postId);
      expect(scope.comment.post.id).toBe(post.id);
      expect(scope.comment.post.url).toBe(post.url);
      expect(scope.comment.post.description).toBe(post.description);
      expect(scope.comment.post.userId).toBe(post.userId);
      expect(scope.comment.post.createdAt).toBe(post.createdAt);

      expect(scope.comment.user).not.toBe(null);
      expect(scope.comment.user.id).toBe(scope.comment.userId);
      expect(scope.comment.user.id).toBe(user.id);
      expect(scope.comment.user.name).toBe(user.name);
      expect(scope.comment.user.email).toBe(user.email);
    });
  });
}());