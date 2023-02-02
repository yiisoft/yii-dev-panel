import {inspectorApi} from './API/Inspector';
import {gitApi} from './API/GitApi';

export const reducers = {
    [inspectorApi.reducerPath]: inspectorApi.reducer,
    [gitApi.reducerPath]: gitApi.reducer,
};
export const middlewares = [inspectorApi.middleware, gitApi.middleware];
