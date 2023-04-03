const {dependencies} = require('./package.json');

module.exports = {
    name: 'host',
    remotes: {},
    shared: Object.keys(dependencies).map((dependency) => ({
        [dependency]: {
            singleton: true,
            requiredVersion: dependencies[dependency],
        },
    })),
};
