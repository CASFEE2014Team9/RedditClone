(function () {
  'use strict';
  var express = require('express');
  var router = express.Router();

  var login = function (req, res) {
    if (req.user) {
      res.json({
        ret : 'success',
        data : req.user
      });
      return;
    }
    res.status(403);
  };

  router.post('/login', login);

  module.exports = function () {
    return router;
  };
}());