import {routes} from '@yii-dev-panel/app/Module/OpenApi/router';
import {middlewares, reducers} from '@yii-dev-panel/app/Module/OpenApi/api';
import {ModuleInterface} from '@yii-dev-panel/sdk/Types/Module.types';

export const OpenApiModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
