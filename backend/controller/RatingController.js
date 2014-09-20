(function () {
  'use strict';
  var Repository = require('./Repository');
  var ratingRepository = new Repository('rating');

  var RatingController = function RatingController() {
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
      return json(ratingRepository.getAll());
    };

    this.get = function (id) {
      return json(ratingRepository.get(id));
    };

    this.post = function (item) {
      var rating = {
          id : item.id,
          userId: item.userId,
          postId : item.postId,
          score: item.score
      };

      var UserController = require('./UserController');
      if (!UserController.repository.exists(item.userId)) {
          return json('user ' + item.userId + ' not found');
      }

      var PostController = require('./PostController');
      if (!PostController.repository.exists(item.postId)) {
          return json('post ' + item.postId + ' not found');
      }

      ratingRepository.post(rating);
      ratingRepository.saveChanges();
      return success();
    };

    this.delete = function (id) {
      ratingRepository.delete(id);
      ratingRepository.saveChanges();
      return success();
    };
  };

  RatingController.repository = ratingRepository;

  module.exports = RatingController;
}());