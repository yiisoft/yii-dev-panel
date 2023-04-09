import {routes} from '@yii-dev-panel/app/Application/router';
import {middlewares, reducers} from '@yii-dev-panel/app/Application/api';
import {ModuleInterface} from '@yii-dev-panel/sdk/Types/Module.types';

export const ApplicationModule: ModuleInterface = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
    standaloneModule: false,
};
