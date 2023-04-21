import {routes} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/router';
import {middlewares, reducers} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/api';
import {ModuleInterface} from '@yiisoft/yii-dev-panel-sdk/Types/Module.types';

export const ToolbarModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: true,
};
