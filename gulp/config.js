var dist = './dist';
var example = './example';
var src = './src';
var webpackSettings = require('../webpack.config.js');

module.exports = {
  build: {
    tasks: ['webpack', 'example']
  },
  ghpages: {
    src: example + '/**/*'
  },
  watch: {
    src: src + '/**/*'
  },
  webpack: {
    src: src + '/index.js',
    dist: dist,
    example: example,
    settings: webpackSettings
  }
};
