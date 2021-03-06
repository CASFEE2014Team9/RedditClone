(function () {
  'use strict';
  var Repository = require('./../services/Repository');
  var Controller = require('./../services/Controller');
  var postRepository = new Repository('post');

  var PostController = function PostController() {
    Controller.call(this, postRepository);
    var self = this;

    this.post = function post(item) {
      var postdata = {
        id : item.id,
        url : item.url,
        description : item.description,
        userId : item.userId,
        createdAt : item.createdAt
      };

      var UserController = require('./UserController');
      if (!UserController.repository.exists(postdata.userId)) {
        return self.notFound(UserController.repository.type, postdata.userId);
      }

      if (!self.authenticate(postdata.userId)) {
        return self.notAuthentificated();
      }

      self.repository.post(postdata);
      self.repository.saveChanges();
      return self.success(postdata);
    };

    this.deleteItem = function deleteItem(id) {
      // do not try to authentifcate delete as angular does not send body
      //if (!self.authenticate(self.repository.get(id).userId)) {
      //  return self.notAuthentificated();
      //}

      var CommentController = require('./CommentController');
      var RatingController = require('./RatingController');

      new CommentController().deleteIfPropertyMatches('postId', id);
      new RatingController().deleteIfPropertyMatches('postId', id);

      self.repository.deleteItem(id);
      self.repository.saveChanges();
      return self.success();
    };
  };

  PostController.prototype = new Controller();
  PostController.prototype.constructor = PostController;
  PostController.parent = Controller.prototype;
  PostController.repository = postRepository;

  module.exports = PostController;
}());