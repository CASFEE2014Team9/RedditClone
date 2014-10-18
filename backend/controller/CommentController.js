(function () {
  'use strict';
  var Repository = require('./../services/Repository');
  var Controller = require('./../services/Controller');
  var commentRepository = new Repository('comment');

  var CommentController = function CommentController() {
    Controller.call(this, commentRepository);
    var self = this;

    this.post = function post(item) {
      var comment = {
        id : item.id,
        userId: item.userId,
        postId : item.postId,
        comment : item.comment,
        createdAt : item.createdAt
      };

      var UserController = require('./UserController');
      if (!UserController.repository.exists(item.userId)) {
        return self.notFound(UserController.repository.type, item.userId);
      }

      var PostController = require('./PostController');
      if (!PostController.repository.exists(item.postId)) {
        return self.notFound(PostController.repository.type, item.postId);
      }

      self.repository.post(comment);
      self.repository.saveChanges();
      return self.success(comment);
    };
  };

  CommentController.prototype = new Controller();
  CommentController.prototype.constructor = CommentController;
  CommentController.parent = Controller.prototype;
  CommentController.repository = commentRepository;

  module.exports = CommentController;
}());