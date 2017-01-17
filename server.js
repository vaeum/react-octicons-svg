const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = 4000;

new WebpackDevServer(webpack(config), {
  stats: {
    // Config for minimal console.log mess.
    // assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    // chunkModules: false
  },
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, '0.0.0.0', function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> Слушаем порт %s. Перейдите по ссылке http://localhost:%s/ в браузере.', port, port);
  }
});
