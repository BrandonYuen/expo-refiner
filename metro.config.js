const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add the monorepo paths to the Metro config
config.watchFolders = [
  path.resolve(__dirname, '../mobile-sdk-react-native'),
];

// Tell Metro to resolve symlinked packages
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../mobile-sdk-react-native/node_modules'),
];

module.exports = config;
