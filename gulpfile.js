'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

var paths = {
    scripts: ['FrontEnd/Model/**/*.js']
};

gulp.task('lint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter());
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['lint']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['watch', 'lint']);