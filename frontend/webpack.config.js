const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: { '@mui/styled-engine': '@mui/styled-engine-sc' }
  },

  module: {
    rules: [{ test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },

  plugins: [
      new HtmlWebPackPlugin({ template: './src/index.html' })
  ],

  devServer: {
    proxy: { '/api': { target: 'http://localhost:3000' }},
    port: 8080
  }
};
