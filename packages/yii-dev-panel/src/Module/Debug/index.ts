import {routes} from '@yiisoft/yii-dev-panel/Module/Debug/router';
import {middlewares, reducers} from '@yiisoft/yii-dev-panel-sdk/API/Debug/api';
import {ModuleInterface} from '@yiisoft/yii-dev-panel-sdk/Types/Module.types';

export const DebugModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
