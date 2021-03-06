(function () {
  'use strict';

  var gulp = require('gulp');
  var less = require('gulp-less');
  var jshint = require('gulp-jshint');
  var concat = require('gulp-concat');
  var csslint = require('gulp-csslint');
  var karma = require('gulp-karma');
  var sass = require('gulp-ruby-sass');

  var paths = {
    in: {
      app: require('./bower.json').appPath || 'app',
      gulp:    ['./gulpfile.js'],
      scripts: [
        './app/scripts/**/*.js',
        './backend/**/*.js'],
      tests: [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-touch/angular-touch.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.js',
        'bower_components/angular-bootstrap/ui-bootstrap.js',
        'bower_components/socket.io-client/socket.io.js',
        'app/scripts/**/*.js',
        'test/mock/**/*.js',
        'test/spec/**/*.js',
        './test/**/*.js'],
      css:     ['./app/styles/**/*.css'],
      sass:    ['./app/styles/**/*.sass']
    },
    out: {
    }
  };

  //detect js errors
  gulp.task('lint', function () {
    return gulp.src(paths.in.scripts)
      .pipe(jshint())
      .pipe(jshint.reporter());
  });

  //run tests
  gulp.task('test', function () {
    return gulp.src(paths.in.tests)
      .pipe(karma({
        configFile: 'test/karma.conf.js',
        action: 'run'
      }));
    /*
      .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      });
      */
  });

  //detect css errors
  gulp.task('csslint', function () {
    gulp.src(paths.in.css)
      .pipe(csslint())
      .pipe(csslint.reporter());
  });

  gulp.task('sass', function () {
    gulp.src(paths.in.sass)
        .pipe(sass())
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('./app/styles/'));
  });

  gulp.task('serve', function () {
    var server = require('./bin/www');
  });

  // Rerun the task when a file changes
  gulp.task('watch', function () {
    gulp.watch(paths.in.scripts, ['lint']);
    gulp.watch(paths.in.scripts, ['test']);
    gulp.watch(paths.in.tests, ['test']);
    gulp.watch(paths.in.css, ['csslint']);
    gulp.watch(paths.in.sass, ['sass']);
    gulp.watch(paths.in.gulp, ['default']);
  });

  gulp.task('default', ['watch', 'lint', 'test', 'csslint', 'sass', 'serve']);
}());
