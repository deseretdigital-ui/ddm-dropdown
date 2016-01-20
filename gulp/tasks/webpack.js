var gulp = require('gulp');
var webpack = require('webpack-stream');
var config = require('../config').webpack;
var handleErrors = require('../util/handleErrors');

gulp.task("webpack", function() {
    return gulp.src(config.src)
      .pipe(webpack(config.settings))
      .on('error', handleErrors)
      .pipe(gulp.dest(config.dist))
      .pipe(gulp.dest(config.example));
});
