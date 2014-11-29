
/*global describe, beforeEach, afterEach, it, expect, inject, jasmine, customMatchers,
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
      jasmine.addMatchers(customMatchers);
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

      expect(scope.user.comments).anyItemMatchProperty({
        property : 'id',
        value : comment.id
      });
      expect(scope.user.comments).allItemsMatchProperty({
        property : 'userId',
        value : user.id
      });

      expect(scope.user.ratings).anyItemMatchProperty({
        property : 'id',
        value : rating.id
      });
      expect(scope.user.ratings).allItemsMatchProperty({
        property : 'userId',
        value : user.id
      });

      expect(scope.user.posts).anyItemMatchProperty({
        property : 'id',
        value : post.id
      });
      expect(scope.user.posts).allItemsMatchProperty({
        property : 'userId',
        value : user.id
      });
    });
  });
}());