var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();



gulp.task('default', ['scss', 'static']);



var scssFiles = './src/scss/**/*.scss';
gulp.task('scss', function () {
  return gulp.src('./src/scss/dropdown.scss')
    .pipe(plugins.sass())
    .pipe(gulp.dest('./build'));
});



var staticFiles = [
  './src/dropdown.js'
];
gulp.task('static', function () {
  return gulp.src(staticFiles, { base: './src' })
    .pipe(gulp.dest('./build'));
});



gulp.task('watch', ['default'], function () {
  gulp.watch(scssFiles, ['scss']);
  gulp.watch(staticFiles, ['static']);
});
