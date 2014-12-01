(function () {
  'use strict';
  var Repository = require('./../services/Repository');
  var Controller = require('./../services/Controller');
  var commentRatingRepository = new Repository('commentRating');

  var CommentRatingController = function CommentRatingController() {
    Controller.call(this, commentRatingRepository);
    var self = this;

    this.post = function post(item) {
      var rating = {
        id : item.id,
        userId: item.userId,
        commentId : item.commentId,
        score: item.score
      };

      var UserController = require('./UserController');
      if (!UserController.repository.exists(item.userId)) {
        return self.notFound(UserController.repository.type, item.userId);
      }

      var CommentController = require('./CommentController');
      if (!CommentController.repository.exists(item.commentId)) {
        return self.notFound(CommentController.repository.type, item.commentId);
      }

      if (!self.authenticate(item.userId)) {
        return self.notAuthentificated();
      }

      self.repository.post(rating);
      self.repository.saveChanges();
      return self.success(rating);
    };
  };

  CommentRatingController.prototype = new Controller();
  CommentRatingController.prototype.constructor = CommentRatingController;
  CommentRatingController.parent = Controller.prototype;
  CommentRatingController.repository = commentRatingRepository;

  module.exports = CommentRatingController;
}());