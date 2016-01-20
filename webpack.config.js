var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  'process.env': {'NODE_ENV': JSON.stringify('production')}
});

module.exports = {
  output: {
    filename: 'dropdown.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/, loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader?{browsers:["last 2 version", "> 1%", "ie 8"]}',
          'sass-loader'
        ]
      }
    ]
  },
  externals: {
    "react": {
      root: "React",
      commonjs: "react",
      commonjs2: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom"
    },
    "jquery": {
      root: "jQuery",
      commonjs: "jquery",
      commonjs2: "jquery",
      amd: "jquery"
    }
  },
  resolve: {
    // you can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    definePlugin
  ]
};
