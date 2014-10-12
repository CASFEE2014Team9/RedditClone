(function () {
  'use strict';
  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var livereload = require('express-livereload');
  var socket = require('socket.io');

  var dataRouter = require('./routes/data');

  var app = express();
  var io = socket.listen(3001);

  app.root = path.join(__dirname, '/../');

  //middleware
  app.use(favicon(path.join(app.root, '/app/favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());

  app.set('views', path.join(app.root, '/backend/views'));
  app.set('view engine', 'jade');

  //routes
  app.use(express.static(path.join(app.root, '/app')));
  app.use('/bower_components/', express.static(path.join(app.root, '/bower_components')));

  app.use('/data/', dataRouter(io));

  /// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /// error handlers

  // development error handler
  // will print stacktrace
  /*jshint unused: false*/
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  /*jshint unused: true*/

  livereload(app, {
    watchDir: path.join(app.root, '/app')
  });

  module.exports = app;
}());
