(function () {
  'use strict';
  var Repository = require('./../services/Repository');
  var Controller = require('./../services/Controller');
  var userRepository = new Repository('user');

  var UserController = function UserController() {
    Controller.call(this, userRepository);
    var self = this;

    this.post = function post(item) {
      var user = {
        id : item.id,
        name : item.name,
        email : item.email,
        password : item.password
      };

      return UserController.parent.post(user);
    };

    this.deleteItem = function deleteItem(id) {
      var PostController = require('./PostController');
      var CommentController = require('./CommentController');
      var RatingController = require('./RatingController');

      new PostController().deleteIfPropertyMatches('userId', id);
      new CommentController().deleteIfPropertyMatches('userId', id);
      new RatingController().deleteIfPropertyMatches('userId', id);

      return UserController.parent.delete(id);
    };
  };

  UserController.prototype = new Controller();
  UserController.prototype.constructor = UserController;
  UserController.parent = Controller.prototype;
  UserController.repository = userRepository;

  module.exports = UserController;
}());