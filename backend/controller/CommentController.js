(function () {
  'use strict';
  var Repository = require('./Repository');
  var commentRepository = new Repository('comment');

  var CommentController = function CommentController() {
    this.req = null;
    this.res = null;
    var self = this;

    var json = function (data) {
      if (self.res) {
        self.res.json(data);
      }
      return data;
    };

    var success = function () {
      return json(200);
    };

    this.getAll = function () {
      return json(commentRepository.getAll());
    };

    this.get = function (id) {
      return json(commentRepository.get(id));
    };

    this.post = function (item) {
      var comment = {
        id : item.id,
        userId: item.userId,
        postId : item.postId,
        comment : item.comment
      };

      var UserController = require('./UserController');
      if (!UserController.repository.exists(item.userId)) {
        return json('user ' + item.userId + ' not found');
      }

      var PostController = require('./PostController');
      if (!PostController.repository.exists(item.postId)) {
        return json('post ' + item.postId + ' not found');
      }

      commentRepository.post(comment);
      commentRepository.saveChanges();
      return success();
    };

    this.delete = function (id) {
      commentRepository.delete(id);
      commentRepository.saveChanges();
      return success();
    };
  };

  CommentController.repository = commentRepository;

  module.exports = CommentController;
}());