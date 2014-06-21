'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');

var paths = {
    in: {
        scripts: ['./FrontEnd/Model/**/*.js'],
        less: ['./FrontEnd/less/**/*.less']
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

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.in.scripts, ['lint']);
    gulp.watch(paths.in.less, ['less']);
});

gulp.task('default', ['watch', 'lint', 'less']);