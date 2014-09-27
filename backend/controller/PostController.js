(function () {
  'use strict';
  var Repository = require('./../services/Repository');
  var Controller = require('./../services/Controller');
  var postRepository = new Repository('post');

  var PostController = function PostController() {
    Controller.call(this, postRepository);
    var self = this;

    this.post = function post(item) {
      var post = {
        id : item.id,
        url : item.url,
        description : item.description,
        userId : item.userId,
        createdAt : item.createdAt
      };

      var UserController = require('./UserController');
      if (!UserController.repository.exists(item.userId)) {
        return self.notFound(UserController.repository.type, item.userId);
      }

      self.repository.post(post);
      self.repository.saveChanges();
      return self.success(post);
    };

    this.deleteItem = function deleteItem(id) {
      var CommentController = require('./CommentController');
      var RatingController = require('./RatingController');

      new CommentController().deleteIfPropertyMatches('postId', id);
      new RatingController().deleteIfPropertyMatches('postId', id);

      self.repository.delete(id);
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