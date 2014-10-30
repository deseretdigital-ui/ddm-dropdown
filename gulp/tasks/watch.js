var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['build'], function() {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.react.src, ['react']);
  gulp.watch(config.bower.src, ['bower']);
});
