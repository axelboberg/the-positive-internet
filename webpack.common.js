/**
 * Axel Boberg © 2019
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const TARGET = process.env.npm_lifecycle_event

module.exports = {
  entry: './app',
  plugins: [
    new MiniCssExtractPlugin({
      filename: TARGET === 'dev' ? '[name].bundle.css' : '[hash].[name].bundle.css'
    })
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: TARGET === 'dev' ? '[name].bundle.js' : '[hash].[name].bundle.js'
  },
  module: {
    rules: [{
        test: /\.(png|jp(e*)g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            name: 'assets/[name].[ext]',
            limit: 8000,
            emitFile: true
          }
        }
      },{
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  }
}