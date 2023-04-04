process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = process.env.ASSET_PATH || '/';

require('./overrides/webpack-config');
require('react-scripts/scripts/build');
