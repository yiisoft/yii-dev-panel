import {routes} from '@yii-dev-panel/app/Module/Debug/router';
import {middlewares, reducers} from '@yii-dev-panel/sdk/API/Debug/api';
import {ModuleInterface} from '@yii-dev-panel/sdk/Types/Module.types';

export const DebugModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
