var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');
var config = require('../config').sass;

gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(sass({
      outputStyle: config.outputStyle
    }))
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8'))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dist))
    .pipe(gulp.dest(config.example))
    ;
});
