import {routes} from '@yiisoft/yii-dev-panel/Module/Gii/router';
import {middlewares, reducers} from '@yiisoft/yii-dev-panel/Module/Gii/api';
import {ModuleInterface} from '@yiisoft/yii-dev-panel-sdk/Types/Module.types';

export const GiiModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
