import {ModuleInterface} from '@yiisoft/yii-dev-panel-sdk/Types/Module.types';
import {middlewares, reducers} from '@yiisoft/yii-dev-panel/Application/api';
import {routes} from '@yiisoft/yii-dev-panel/Application/router';

export const ApplicationModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
