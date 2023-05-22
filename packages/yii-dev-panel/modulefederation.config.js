// @ts-ignore
const {dependencies} = require('../yii-dev-panel-sdk/package.json');

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
