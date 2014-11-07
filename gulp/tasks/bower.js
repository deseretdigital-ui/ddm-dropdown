var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var config = require('../config').bower;

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles(), { base: config.src })
    .pipe(gulp.dest(config.example));
});
