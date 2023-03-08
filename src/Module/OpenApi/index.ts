import {routes} from './router';
import {middlewares, reducers} from './api';

export const OpenApiModule = {
    routes: routes,
    reducers: reducers,
    middlewares: middlewares,
};
