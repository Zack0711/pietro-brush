const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  return ({
    context: `${__dirname}/`,
    entry: {
      web: './src/index.jsx',
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
          type: 'asset/resource',
          generator: {
            filename: '[path][name].[ext]'
          },
          use: [
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
          type: 'asset/resource',
          generator: {
            filename: 'public/fonts/[name].[ext]'
          }
        },
        { test: /\.html$/, use: 'html-loader' },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `src/index.ejs`,
      }),
      new MiniCssExtractPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  })
}
