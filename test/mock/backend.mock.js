

'use strict';
var comment = {
  "id": "1",
  "userId" : "1",
  "postId" : "1",
  "createdAt" : "\"2014-11-09T14:44:57.974Z\""
};

var rating = {
  "id": "1",
  "userId" : "1",
  "postId" : "1",
  "score" : "1"
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

var setupBackend = function ($injector) {
  var $httpBackend = $injector.get('$httpBackend');

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

  $httpBackend.when('GET', 'http://localhost:8080/data/comments/')
    .respond({
      "ret" : "success",
      "data": { "1": comment }
    });

  $httpBackend.when('GET', 'http://localhost:8080/data/ratings/')
    .respond({
      "ret" : "success",
      "data": { "1": rating }
    });
};

// override io here
// TODO this is not working
module('io');
module(function ($provide) {
  $provide.factory('io', {
    on : function () {}
  });
});