import {inspectorApi} from "./API/Inspector";

export const reducers = {
    [inspectorApi.reducerPath]: inspectorApi.reducer,
}
export const middlewares = [
    inspectorApi.middleware,
]