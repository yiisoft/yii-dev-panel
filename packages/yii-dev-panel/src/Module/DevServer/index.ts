import {ModuleInterface} from '@yiisoft/yii-dev-panel-sdk/Types/Module.types';
import {middlewares, reducers} from '@yiisoft/yii-dev-panel/Module/DevServer/api';
import {routes} from '@yiisoft/yii-dev-panel/Module/DevServer/router';

export const DevServerModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
