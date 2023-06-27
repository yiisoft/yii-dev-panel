import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const {dependencies} = require('../yii-dev-panel-sdk/package.json');

const sharedModules = Object.entries(dependencies).map(([name, version]) => name);
export default defineConfig(async ({command}) => ({
    server: {
        open: false,
        port: 3000,
        fs: {
            allow: ['.'],
        },
    },
    resolve: {
        alias: {
            // Needed for `useSelector` tracking in wdyr.tsx: https://github.com/welldone-software/why-did-you-render/issues/85
            'react-redux': 'react-redux/dist/react-redux.js',
            '@yiisoft/yii-dev-panel/*': '../yii-dev-panel/src/*',
            '@yiisoft/yii-dev-panel-sdk/*': '../yii-dev-panel-sdk/src/*',
            '@yiisoft/yii-dev-toolbar/*': '../yii-dev-toolbar/src/*',
        },
    },
    plugins: [
        react({
            jsxImportSource: '@welldone-software/why-did-you-render',
        }),
        viteTsconfigPaths(),
        svgrPlugin(),
        federation({
            name: 'host',
            remotes: {},
            shared: sharedModules,
        }),
    ],
    base: './',
    build: {
        minify: 'terser',
        outDir: 'dist',
        target: 'esnext',
    },
}));
