const {dependencies} = require('../sdk/package.json');

const sharedModules = Object.entries(dependencies).map(([name, version]) => ({
    [name]: {
        singleton: true,
        requiredVersion: version,
    },
}));

module.exports = {
    name: 'host',
    remotes: {},
    shared: sharedModules,
};
