const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Other webpack configurations...
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
  plugins: [
    new Dotenv(),
    // Other plugins...
  ],
};
