

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

var commentRating = {
  "id": "1",
  "userId" : "1",
  "commentId" : "1",
  "score" : "1"
};

var user = {
  "name": "Someone",
  "email": "something@somewhere.com",
  "id": "1",
  "password": "1234"
};

var post = {
  "url": "http://espn.go.com",
  "description": "Sport site",
  "userId": "1",
  "createdAt": "\"2014-11-09T14:44:57.974Z\"",
  "id": "1"
};

var setupBackend = function ($injector) {
  var success = function (data) {
    return {
      "ret" : "success",
      "data": data
    };
  };

  var $httpBackend = $injector.get('$httpBackend');

  $httpBackend.when('GET', 'http://localhost:8080/data/users/')
    .respond(success({
      "1": user
    }));

  $httpBackend.when('GET', 'http://localhost:8080/data/posts/')
    .respond(success({
      "1": post
    }));

  $httpBackend.when('GET', 'http://localhost:8080/data/comments/')
    .respond(success({
      "1": comment
    }));

  $httpBackend.when('GET', 'http://localhost:8080/data/ratings/')
    .respond(success({
      "1": rating
    }));

  $httpBackend.when('GET', 'http://localhost:8080/data/commentRatings/')
    .respond(success({
      "1": commentRating
    }));

  $httpBackend.when('POST', 'http://localhost:8080/login')
    .respond(success(user));

  var cached;
  $httpBackend.when('POST', 'http://localhost:8080/data/posts', function (data) {
    cached = data;
    return true;
  })
    .respond(success(cached));


  $httpBackend.when('POST', 'http://localhost:8080/data/posts')
    .respond(success(post));
};

// override io here
// TODO this is not working
module('io');
module(function ($provide) {
  $provide.factory('io', {
    on : function () {}
  });
});