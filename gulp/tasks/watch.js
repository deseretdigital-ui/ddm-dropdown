var gulp = require('gulp');
var webpack = require('webpack-stream');
var config = require('../config').webpack;
var handleErrors = require('../util/handleErrors');

gulp.task("watch", function() {
    var watchSettings = config.settings;
    watchSettings.watch = true;

    return gulp.src(config.src)
      .pipe(webpack(watchSettings))
      .on('error', handleErrors)
      .pipe(gulp.dest(config.dist))
      .pipe(gulp.dest(config.example));
});
