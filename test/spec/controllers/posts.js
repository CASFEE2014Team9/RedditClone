
/*global describe, beforeEach, afterEach, it, expect, inject,
 setupBackend, post, user, rating, comment */

(function () {
  'use strict';

  describe('Controller: PostCtrl', function () {

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
      scope.post = post;
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should fetch comment related data to the scope', function () {
      $httpBackend.expectGET('http://localhost:8080/data/users/');

      $controller('PostCtrl', {
        $scope: scope
      });

      $httpBackend.flush();

      var convertedDate = new Date(JSON.parse(post.createdAt));
      expect(scope.createdAt.getTime()).toBe(convertedDate.getTime());

      expect(scope.post.user).not.toBe(null);
      expect(scope.post.user.id).toBe(scope.post.userId);
      expect(scope.post.user.id).toBe(user.id);
      expect(scope.post.user.name).toBe(user.name);
      expect(scope.post.user.email).toBe(user.email);
    });
  });
}());