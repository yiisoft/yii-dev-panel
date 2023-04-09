import {createBrowserRouter, createHashRouter, RouteObject} from 'react-router-dom';
import React from 'react';
import {ModuleInterface} from '@yii-dev-panel/sdk/Types/Module.types';
import {Layout} from '@yii-dev-panel/sdk/Pages/Layout';
import {Config} from '@yii-dev-panel/sdk/Config';
import {DebugToolbar} from '@yii-dev-panel/toolbar/Module/Toolbar/Component/Toolbar/DebugToolbar';

// TODO: move DebugToolbar somewhere else
export function createRouter(modules: ModuleInterface[]) {
    const standaloneModules = modules.filter((module) => module.standaloneModule);
    const others = modules.filter((module) => !module.standaloneModule);

    const routes: RouteObject[] = [
        {
            path: '/',
            element: (
                <Layout>
                    <DebugToolbar />
                </Layout>
            ),
            children: ([] as RouteObject[]).concat(...others.map((module) => module.routes)),
        },
        ...([] as RouteObject[]).concat(...standaloneModules.map((module) => module.routes)),
    ];
    return Config.appEnv === 'github' ? createHashRouter(routes) : createBrowserRouter(routes);
}
