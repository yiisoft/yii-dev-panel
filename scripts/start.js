process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.ASSET_PATH = process.env.ASSET_PATH || '/';

require('./overrides/webpack-config');
require('react-scripts/scripts/start');
