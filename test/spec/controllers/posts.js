
/*global describe, beforeEach, afterEach, it, expect, inject, jasmine, customMatchers,
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
      jasmine.addMatchers(customMatchers);
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


      expect(scope.post.comments).anyItemMatchProperty({
        property : 'id',
        value : comment.id
      });
      expect(scope.post.comments).allItemsMatchProperty({
        property : 'userId',
        value : user.id
      });

      expect(scope.post.ratings).anyItemMatchProperty({
        property : 'id',
        value : rating.id
      });
      expect(scope.post.ratings).allItemsMatchProperty({
        property : 'userId',
        value : user.id
      });
    });
  });

  describe('Controller: EditCtrl', function () {

    // load the controller's module
    beforeEach(module('redditcloneApp'));

    var scope,
      $httpBackend,
      $controller,
      newPost,
      $session;

    newPost = {};

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($rootScope, $injector, session) {
      jasmine.addMatchers(customMatchers);
      $httpBackend =  $injector.get('$httpBackend');
      $controller =  $injector.get('$controller');
      $session = session;

      inject(setupBackend);

      scope = $rootScope.$new();
      scope.post = newPost;
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create post', function (done) {
      $httpBackend.expectPOST('http://localhost:8080/data/posts/');

      $controller('EditCtrl', {
        $scope: scope
      });

      $session.user.name = user.name;
      $session.user.password = user.password;
      $session.login().then(function () {
        var promise = scope.create();

        $httpBackend.flush(); //respond to create post request

        promise.then(done);
      }, done);

      $httpBackend.flush(); // respond to login request

    });
  });
}());