import {routes} from '@yii-dev-panel/app/Module/Inspector/router';
import {middlewares, reducers} from '@yii-dev-panel/app/Module/Inspector/api';
import {ModuleInterface} from '@yii-dev-panel/sdk/Types/Module.types';

export const InspectorModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
