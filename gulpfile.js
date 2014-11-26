(function () {
  'use strict';

  var gulp = require('gulp');
  var less = require('gulp-less');
  var jshint = require('gulp-jshint');
  var concat = require('gulp-concat');
  var qunit = require('gulp-qunit');
  var csslint = require('gulp-csslint');
  var karma = require('gulp-karma');

  var paths = {
    in: {
      app: require('./bower.json').appPath || 'app',
      gulp:    ['./gulpfile.js'],
      scripts: [
        './app/scripts/**/*.js',
        './backend/**/*.js'],
      tests: [
        './test/**/*.js'],
<<<<<<< HEAD
      css:     ['./app/styles/**/*.css'],
      sass:    ['./app/styles/**/*.sass']
=======
      css:     ['./app/styles/**/*.css']
>>>>>>> 77ce1c23ea2096d16863947f8b59a59a5a843a7a
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
    gulp.watch(paths.in.gulp, ['default']);
  });

  gulp.task('default', ['watch', 'lint', 'test', 'csslint', 'serve']);
}());
