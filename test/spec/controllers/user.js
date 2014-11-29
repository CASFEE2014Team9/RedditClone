
/*global describe, beforeEach, afterEach, it, expect, inject,
 setupBackend, post, user, rating, comment */

(function () {
  'use strict';

  describe('Controller: UserCtrl', function () {

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
      scope.user = user;
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should fetch comment related data to the scope', function () {
      $httpBackend.expectGET('http://localhost:8080/data/posts/');
      $httpBackend.expectGET('http://localhost:8080/data/comments/');
      $httpBackend.expectGET('http://localhost:8080/data/ratings/');

      $controller('UserCtrl', {
        $scope: scope
      });

      $httpBackend.flush();

    });
  });
}());