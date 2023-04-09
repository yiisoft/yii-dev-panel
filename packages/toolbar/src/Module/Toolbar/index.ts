import {routes} from '@yii-dev-panel/toolbar/Module/Toolbar/router';
import {middlewares, reducers} from '@yii-dev-panel/toolbar/Module/Toolbar/api';
import {ModuleInterface} from '@yii-dev-panel/sdk/Types/Module.types';

export const ToolbarModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: true,
};
