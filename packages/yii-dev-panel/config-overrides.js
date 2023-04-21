const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = (config) => {
    config.resolve.plugins.pop();

    // Resolve the path aliases.
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    // Let Babel compile outside of src/.
    const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
    const tsRule = oneOfRule.oneOf.find((rule) => rule.test.toString().includes('ts|tsx'));

    tsRule.include = undefined;
    tsRule.exclude = /node_modules/;

    const forkTsPlugInInstances = config.plugins.find((p) => p.constructor.name === 'ForkTsCheckerWebpackPlugin');

    if (forkTsPlugInInstances) {
        forkTsPlugInInstances.options.typescript.build = true;
        forkTsPlugInInstances.options.typescript.mode = 'readonly';
    }

    // Enable Module Federation.
    config.plugins.push(new ModuleFederationPlugin(require('./modulefederation.config.js')));

    return config;
};
