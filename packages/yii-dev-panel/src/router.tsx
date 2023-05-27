import {Config} from '@yiisoft/yii-dev-panel-sdk/Config';
import {Layout} from '@yiisoft/yii-dev-panel-sdk/Pages/Layout';
import {ModuleInterface} from '@yiisoft/yii-dev-panel-sdk/Types/Module.types';
import {DebugToolbar} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/Component/Toolbar/DebugToolbar';
import {createBrowserRouter, createHashRouter, RouteObject} from 'react-router-dom';

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
