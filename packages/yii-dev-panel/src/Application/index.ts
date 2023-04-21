import {routes} from '@yiisoft/yii-dev-panel/Application/router';
import {middlewares, reducers} from '@yiisoft/yii-dev-panel/Application/api';
import {ModuleInterface} from '@yiisoft/yii-dev-panel-sdk/Types/Module.types';

export const ApplicationModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
