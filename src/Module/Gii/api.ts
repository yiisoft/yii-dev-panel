import {giiApi} from "./API/Gii";

export const reducers = {
    [giiApi.reducerPath]: giiApi.reducer,
}
export const middlewares = [
    giiApi.middleware,
]