const path = require('path');
const webpack = require('webpack');
const NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'production');

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

const plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin()
];

if (NODE_ENV === '"production"') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
      },
      output: {
        comments: false,
      },
    })
  );

  plugins.push(
    new webpack.DefinePlugin({
      DEV: NODE_ENV === '"development"',
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    })
  );
}

if (NODE_ENV === '"development"') {
  plugins.push(
    new webpack.DefinePlugin({
      DEV: NODE_ENV === '"development"',
    })
  );
}

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css', 'json'],
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src')},
      {test: /\.scss$/, loaders: ['style', 'css', 'postcss-loader', 'sass']},
      {test: /.json$/, loaders: ['json']},
      { test: /\.md$/, loader: "html!markdown" },
    ]
  },
  postcss: function () {
    return [
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
    ];
  },
  plugins,
};
