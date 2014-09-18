'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var qunit = require('gulp-qunit');
var csslint = require('gulp-csslint');

var paths = {
    in: {
        app: require('./bower.json').appPath || 'app',
        gulp:    ['./gulpfile.js'],
        scripts: ['./app/scripts/**/*.js'],
        css:     ['./app/styles/**/*.css']
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
//detect css errors
gulp.task('csslint', function () {
    gulp.src(paths.in.css)
        .pipe(csslint())
        .pipe(csslint.reporter());
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.in.scripts, ['lint']);
    gulp.watch(paths.in.css, ['csslint']);
    gulp.watch(paths.in.gulp, ['default']);
});

gulp.task('default', ['watch', 'lint', 'csslint']);