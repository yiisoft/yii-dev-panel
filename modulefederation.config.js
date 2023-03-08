const {dependencies} = require('./package.json');

module.exports = {
    name: 'host',
    remotes: {
        // remote: 'remote@http://localhost:3002/remoteEntry.js',
    },
    shared: {
        // ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies['react'],
        },
        'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
        },
        'react-router': {
            singleton: true,
            requiredVersion: dependencies['react-router'],
        },
        'react-router-dom': {
            singleton: true,
            requiredVersion: dependencies['react-router-dom'],
        },
        '@mui/material': {
            singleton: true,
            requiredVersion: dependencies['@mui/material'],
        },
        '@mui/icons-material': {
            singleton: true,
            requiredVersion: dependencies['@mui/icons-material'],
        },
    },
};
