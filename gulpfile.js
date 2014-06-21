'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var qunit = require('gulp-qunit');

var paths = {
    in: {
        gulp: ['./gulpfile.js'],
        scripts:
            [
                './FrontEnd/Model/**/*.js',
                './FrontEnd/Lib/Array.js',
                './FrontEnd/Lib/guard.js',
                './FrontEnd/Lib/string.js',
                './FrontEnd/Forms/**/*.js'
            ],
        less: ['./FrontEnd/less/**/*.less'],
        tests: ['./FrontEnd/Model/Tests/Test.html']
    },
    out: {
        css: './FrontEnd/css/'
    }
};

// convert less to css and concat it to one css file
gulp.task('less', function () {
    gulp.src(paths.in.less)
        .pipe(less())
        .pipe(concat('default.css'))
        .pipe(gulp.dest(paths.out.css));
});

//detect js errors
gulp.task('lint', function () {
    return gulp.src(paths.in.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter());
});

//run tests
gulp.task('qunit', function () {
    return gulp.src(paths.in.tests)
        .pipe(qunit());
});


// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.in.scripts, ['lint']);
    gulp.watch(paths.in.scripts, ['qunit']);
    gulp.watch(paths.in.less, ['less']);
    gulp.watch(paths.in.gulp, ['default']);
});

gulp.task('default', ['watch', 'lint', 'qunit', 'less']);