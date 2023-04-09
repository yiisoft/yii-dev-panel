import {routes} from '@yii-dev-panel/app/Module/Gii/router';
import {middlewares, reducers} from '@yii-dev-panel/app/Module/Gii/api';
import {ModuleInterface} from '@yii-dev-panel/sdk/Types/Module.types';

export const GiiModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
