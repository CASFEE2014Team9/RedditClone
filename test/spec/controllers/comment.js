
/*global describe, beforeEach, it, expect, inject */

'use strict';

describe('Controller: CommentCtrl', function () {

  // load the controller's module
  beforeEach(module('redditcloneApp'));

  var CommentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.comment = {
      userId : 1
    };
    CommentCtrl = $controller('CommentCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
