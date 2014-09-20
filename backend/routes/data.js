(function () {
  'use strict';
  var express = require('express');
  var router = express.Router();
  var UserController = require('./../controller/UserController');
  var PostController = require('./../controller/PostController');
  var RatingController = require('./../controller/RatingController');
  var CommentController = require('./../controller/CommentController');

  var routeController = function (path, Controller) {
    router.get(path, function (req, res) {
      var controller = new Controller();
      controller.req = req;
      controller.res = res;
      controller.getAll();
    });
    router.post(path, function (req, res) {
      var controller = new Controller();
      controller.req = req;
      controller.res = res;
      controller.post(req.body);
    });
    router.get(path + '/:id', function (req, res) {
      var id = req.params.id;
      var controller = new Controller();
      controller.req = req;
      controller.res = res;
      controller.get(id);
    });
    router.delete(path + '/:id', function (req, res) {
      var id = req.params.id;
      var controller = new Controller();
      controller.req = req;
      controller.res = res;
      controller.delete(id);
    });
  };

  routeController('/users', UserController);
  routeController('/posts', PostController);
  routeController('/ratings', RatingController);
  routeController('/comments', CommentController);

  module.exports = router;
}());