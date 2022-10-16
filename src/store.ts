import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";
import {inspectorApi} from "./API/Inspector";
import {debugApi} from "./API/Debug";
import {debugSlice} from "./Provider/Debug/DebugEntryContext";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {ApplicationSlice} from "./Provider/ApplicationContext";
import {useSelector} from "react-redux";
import {giiApi} from "./API/Gii";

const commonConfig = {version: 1, storage};
const applicationSliceConfig = {key: ApplicationSlice.reducer.name, ...commonConfig};
const debugSliceConfig = {key: debugSlice.reducer.name, ...commonConfig};

const rootReducer = combineReducers({
    [ApplicationSlice.name]: persistReducer(applicationSliceConfig, ApplicationSlice.reducer),
    [debugSlice.name]: persistReducer(debugSliceConfig, debugSlice.reducer),

    [inspectorApi.reducerPath]: inspectorApi.reducer,
    [debugApi.reducerPath]: debugApi.reducer,
    [giiApi.reducerPath]: giiApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([inspectorApi.middleware, debugApi.middleware, giiApi.middleware]),
    devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
const useAppSelector = useSelector<RootState>;

export {useAppSelector as useSelector};

