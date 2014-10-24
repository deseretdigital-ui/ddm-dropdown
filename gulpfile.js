var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.ghpages = require('gulp-gh-pages');



gulp.task('default', ['scss', 'static', 'example']);



var scssFiles = './src/scss/**/*.scss';
gulp.task('scss', function () {
  return gulp.src('./src/scss/dropdown.scss')
    .pipe(plugins.sass())
    .pipe(gulp.dest('./dist'));
});



var staticFiles = [
  './src/dropdown.js'
];
gulp.task('static', function () {
  return gulp.src(staticFiles, { base: './src' })
    .pipe(gulp.dest('./dist'));
});



gulp.task('example', ['scss', 'static'], function () {
  var files = [
    './dist/*',
    './bower_components/jquery/dist/jquery.min.js'
  ];
  gulp.src(files)
    .pipe(gulp.dest('./example'));
});



var ghpagesFiles = './example/**/*';
gulp.task('ghpages', ['example'], function () {
  var options = {};
  return gulp.src(ghpagesFiles)
    .pipe(plugins.ghpages(options));
});



gulp.task('watch', ['default'], function () {
  gulp.watch(scssFiles, ['scss']);
  gulp.watch(staticFiles, ['static']);
});
