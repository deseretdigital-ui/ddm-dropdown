var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('example', function () {
  var config = {
    src: './example/demo.jsx',
    dest: './example',
    concat: 'demo.js'
  };

  return gulp.src(config.src)
    .pipe(babel({ presets: ['es2015', 'react'] }))
    .pipe(concat(config.concat))
    .pipe(gulp.dest(config.dest));
});
