var gulp = require('gulp');
var ghpages = require('gulp-gh-pages');
var config = require('../config').ghpages;

gulp.task('ghpages', ['build'], function () {
  return gulp.src(config.src)
    .pipe(ghpages());
});
