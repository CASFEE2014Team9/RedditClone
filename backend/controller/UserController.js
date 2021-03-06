(function () {
  'use strict';
  var Repository = require('./../services/Repository');
  var Controller = require('./../services/Controller');
  var userRepository = new Repository('user');

  userRepository.getPublicData = function getPublicData(id, item) {
    return {
      id : id,
      name : item.name,
      email : item.email
    };
  };

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

      self.repository.post(user);
      self.repository.saveChanges();
      return self.success(user);
    };

    this.deleteItem = function deleteItem(id) {
      var PostController = require('./PostController');
      var CommentController = require('./CommentController');
      var RatingController = require('./RatingController');

      new PostController().deleteIfPropertyMatches('userId', id);
      new CommentController().deleteIfPropertyMatches('userId', id);
      new RatingController().deleteIfPropertyMatches('userId', id);

      self.repository.deleteItem(id);
      self.repository.saveChanges();
      return self.success();
    };
  };

  UserController.login = function (username, password, done) {
    var user = UserController.repository.getMatching('name', username, true)[0];
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  };
  UserController.prototype = new Controller();
  UserController.prototype.constructor = UserController;
  UserController.parent = Controller.prototype;
  UserController.repository = userRepository;

  module.exports = UserController;
}());