const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const SRC_DIR = path.join(__dirname, '/client/src');

const common = {
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
  ],
};

const client = {
  entry: `${SRC_DIR}/Client.jsx`,
  output: {
    path: `${__dirname}/public`,
    filename: 'app.js',
  },
};

const server = {
  entry: `${SRC_DIR}/Server.jsx`,
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: `${__dirname}/public`,
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module',
  },
};


module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];

