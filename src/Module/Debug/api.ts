import {debugApi} from "./API/Debug";
import {debugSlice} from "./Context/Context";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const debugSliceConfig = {
    key: debugSlice.reducer.name,
    version: 1,
    storage,
};

export const reducers = {
    [debugSlice.name]: persistReducer(debugSliceConfig, debugSlice.reducer),
    [debugApi.reducerPath]: debugApi.reducer,
}
export const middlewares = [
    debugApi.middleware,
]