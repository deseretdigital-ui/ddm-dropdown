var gulp = require('gulp');
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var handleErrors = require('../util/handleErrors');
var config = require('../config').react;

gulp.task('react', function () {
  return gulp.src(config.src)
    .pipe(react())
    .on('error', handleErrors )
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dist))
    .pipe(gulp.dest(config.example))
    ;
});
