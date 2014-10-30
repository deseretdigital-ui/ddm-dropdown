var dist = './dist';
var example = './example';
var src = './src';

module.exports = {
  sass: {
    src: src + "/scss/*.scss",
    dist: dist,
    example: example,
    outputStyle: 'compressed'
  },
  react: {
    src: src + "/*.jsx",
    dist: dist,
    example: example
  },
  bower: {
    src: './bower_components',
    example: example + '/bower_components'
  },
  ghpages: {
    src: example + '/**/*'
  }
};
