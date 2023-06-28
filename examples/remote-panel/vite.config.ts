import federation from '@originjs/vite-plugin-federation';
import {defineConfig} from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const sharedModules = ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-dom', 'redux-persist'];
export default defineConfig(async ({command}) => {
    return {
        server: {
            fs: {
                allow: ['.'],
            },
        },
        plugins: [
            viteTsconfigPaths(),
            svgrPlugin(),
            federation({
                name: 'remote',
                remotes: {},
                shared: sharedModules,
                filename: 'external.js',
                exposes: {
                    './LogPanel': './src/LogPanel',
                    './CachePanel': './src/CachePanel',
                },
            }),
        ],
        base: '/',
        build: {
            minify: 'terser',
            outDir: 'dist',
            target: 'esnext',
        },
    };
});
