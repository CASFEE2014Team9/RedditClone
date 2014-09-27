(function () {
  'use strict';
  var Repository = require('./../services/Repository');
  var Controller = require('./../services/Controller');
  var ratingRepository = new Repository('rating');

  var RatingController = function RatingController() {
    Controller.call(this, ratingRepository);
    var self = this;

    this.post = function post(item) {
      var rating = {
        id : item.id,
        userId: item.userId,
        postId : item.postId,
        score: item.score
      };

      var UserController = require('./UserController');
      if (!UserController.repository.exists(item.userId)) {
        return self.notFound(UserController.repository.type, item.userId);
      }

      var PostController = require('./PostController');
      if (!PostController.repository.exists(item.postId)) {
        return self.notFound(PostController.repository.type, item.postId);
      }

      self.repository.post(rating);
      self.repository.saveChanges();
      return self.success(rating);
    };
  };

  RatingController.prototype = new Controller();
  RatingController.prototype.constructor = RatingController;
  RatingController.parent = Controller.prototype;
  RatingController.repository = ratingRepository;

  module.exports = RatingController;
}());