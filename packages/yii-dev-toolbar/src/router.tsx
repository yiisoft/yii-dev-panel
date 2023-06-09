import {Config} from '@yiisoft/yii-dev-panel-sdk/Config';
import {ModuleInterface} from '@yiisoft/yii-dev-panel-sdk/Types/Module.types';
import {createBrowserRouter, createHashRouter, RouteObject} from 'react-router-dom';

export function createRouter(modules: ModuleInterface[]) {
    const standaloneModules = modules.filter((module) => module.standaloneModule);

    const routes: RouteObject[] = [
        ...([] satisfies RouteObject[]).concat(...standaloneModules.map((module) => module.routes)),
    ];
    return Config.appEnv === 'github' ? createHashRouter(routes) : createBrowserRouter(routes);
}
