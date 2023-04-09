import { inspectorApi } from "@yii-dev-panel/app/Module/Inspector/API/Inspector";
import { gitApi } from "@yii-dev-panel/app/Module/Inspector/API/GitApi";

export const reducers = {
    [inspectorApi.reducerPath]: inspectorApi.reducer,
    [gitApi.reducerPath]: gitApi.reducer,
};
export const middlewares = [inspectorApi.middleware, gitApi.middleware];
