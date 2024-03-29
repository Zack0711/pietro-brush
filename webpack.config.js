const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const htmlTemplate = new HtmlWebpackPlugin({
  template: `index.ejs`,
})

const devServer = {
  inline: true,
  https: false,
  open: true,
  host: '0.0.0.0',
  port: 3030,
  historyApiFallback: true,
}

const defaultSetting = {
  page: 'index',
  noMockServer: false,
}

module.exports = (env, argv) => {
  const { page } = Object.assign(defaultSetting, argv)

  const webpackSetting = {
    mode: env === 'dev' ? 'development' : 'production',
    context: `${__dirname}/`,
    entry: {
      web: './index.js',
    },
    output: {
      path: `${__dirname}/dist/`,
      filename: 'js/[name].js?[hash]',
    },
    module: {
      rules: [
        {
          test: /\.js(x)?$/,
          exclude: /(node_modules)/,
          use: 'babel-loader'
        },
        {
          test: /\.styl/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(gif|png|jpe?g)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 4,
                },
                pngquant: {
                  quality: '75-90',
                  speed: 3,
                },
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: 'file-loader?name=public/fonts/[name].[ext]',
        },
        { test: /\.html$/, use: 'html-loader' },
      ],
    },
    plugins: [
      htmlTemplate,
      new MiniCssExtractPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  }

  if (env === 'dev') {
    webpackSetting['devtool'] = 'source-map'
    webpackSetting['devServer'] = devServer
  }

  return webpackSetting
}
