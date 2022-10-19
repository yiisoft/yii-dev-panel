import {debugApi} from "./API/Debug";

export const reducers = {
    [debugApi.reducerPath]: debugApi.reducer,
}
export const middlewares = [
    debugApi.middleware,
]