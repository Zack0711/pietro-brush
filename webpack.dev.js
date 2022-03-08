const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = (env, argv) => {
  return merge(common(env, argv), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      https: false,
      open: true,
      host: 'localhost',
      port: 3030,
      historyApiFallback: true,
    },
  })
}
