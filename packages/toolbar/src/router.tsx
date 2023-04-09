import {createBrowserRouter, createHashRouter, RouteObject} from 'react-router-dom';
import React from 'react';
import {ModuleInterface} from '@yii-dev-panel/sdk/Types/Module.types';
import {Config} from '@yii-dev-panel/sdk/Config';

export function createRouter(modules: ModuleInterface[]) {
    const standaloneModules = modules.filter((module) => module.standaloneModule);

    const routes: RouteObject[] = [
        ...([] as RouteObject[]).concat(...standaloneModules.map((module) => module.routes)),
    ];
    return Config.appEnv === 'github' ? createHashRouter(routes) : createBrowserRouter(routes);
}
