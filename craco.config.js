// craco.config.js
const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@storage': path.resolve(__dirname, 'src/storage/'),
      '@components': path.resolve(__dirname, 'src/components/')
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@storage/(.*)$': '<rootDir>/src/storage/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1'
      }
    }
  }
};
