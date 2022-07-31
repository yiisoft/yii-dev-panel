import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";
import {inspectorApi} from "./API/Inspector/Inspector";
import {debugApi} from "./API/Debug";
import {debugSlice} from "./Provider/Debug/DebugEntryContext";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from "redux-persist/lib/storage";

const commonConfig = {version: 1, storage};
const inspectorApiConfig = {key: inspectorApi.reducer.name, ...commonConfig};
const debugApiConfig = {key: debugApi.reducer.name, ...commonConfig};

const rootReducer = combineReducers({
    [inspectorApi.reducerPath]: inspectorApi.reducer,
    [debugApi.reducerPath]: debugApi.reducer,
    [debugSlice.name]: persistReducer(inspectorApiConfig, debugSlice.reducer),

});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([inspectorApi.middleware, debugApi.middleware]),
    devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
