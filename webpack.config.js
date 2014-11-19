var webpack = require('webpack')

module.exports = {
  output: {
    filename: 'dropdown.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
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
    "react": "React",
    "react/addons": "React",
    "jquery": "jQuery"
  },
  resolve: {
    // you can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
