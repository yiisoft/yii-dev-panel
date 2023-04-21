import {routes} from '@yiisoft/yii-dev-panel/Module/OpenApi/router';
import {middlewares, reducers} from '@yiisoft/yii-dev-panel/Module/OpenApi/api';
import {ModuleInterface} from '@yiisoft/yii-dev-panel-sdk/Types/Module.types';

export const OpenApiModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
