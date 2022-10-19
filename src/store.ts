import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";
import {middlewares as InspectorMiddlewares, reducers as InspectorReducers} from "./Module/Inspector/api";
import {middlewares as DebugMiddlewares, reducers as DebugReducers} from "./Module/Debug/api";
import {middlewares as GiiMiddlewares, reducers as GiiReducers} from "./Module/Gii/api";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {ApplicationSlice} from "./Application/Context/ApplicationContext";
import {useSelector} from "react-redux";

const commonConfig = {version: 1, storage};
const applicationSliceConfig = {key: ApplicationSlice.reducer.name, ...commonConfig};

const rootReducer = combineReducers({
    [ApplicationSlice.name]: persistReducer(applicationSliceConfig, ApplicationSlice.reducer),

    ...InspectorReducers,
    ...DebugReducers,
    ...GiiReducers,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([
            ...InspectorMiddlewares,
            ...DebugMiddlewares,
            ...GiiMiddlewares,
        ]),
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

