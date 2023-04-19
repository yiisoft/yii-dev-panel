const {dependencies} = require('../sdk/package.json');

const sharedModules = Object.keys(dependencies).map((dependency) => ({
    [dependency]: {
        singleton: true,
    },
}));

module.exports = {
    name: 'host',
    remotes: {},
    shared: sharedModules,
};
