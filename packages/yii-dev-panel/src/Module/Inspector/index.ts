import {routes} from '@yiisoft/yii-dev-panel/Module/Inspector/router';
import {middlewares, reducers} from '@yiisoft/yii-dev-panel/Module/Inspector/api';
import {ModuleInterface} from '@yiisoft/yii-dev-panel-sdk/Types/Module.types';

export const InspectorModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
