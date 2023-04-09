import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
    middlewares as ApplicationMiddlewares,
    reducers as ApplicationReducers,
} from '@yii-dev-panel/app/Application/api';
import {
    middlewares as InspectorMiddlewares,
    reducers as InspectorReducers,
} from '@yii-dev-panel/app/Module/Inspector/api';
import {middlewares as DebugMiddlewares, reducers as DebugReducers} from '@yii-dev-panel/sdk/API/Debug/api';
import {middlewares as GiiMiddlewares, reducers as GiiReducers} from '@yii-dev-panel/app/Module/Gii/api';
import {middlewares as OpenApiMiddlewares, reducers as OpenApiReducers} from '@yii-dev-panel/app/Module/OpenApi/api';
// import {middlewares as ToolbarApiMiddlewares, reducers as ToolbarApiReducers} from './Module/Toolbar/api';
import {FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

// TODO: get reducers and middlewares from modules.ts
const rootReducer = combineReducers({
    ...ApplicationReducers,
    ...InspectorReducers,
    ...DebugReducers,
    ...GiiReducers,
    ...OpenApiReducers,
    // ...ToolbarApiReducers,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([
            ...ApplicationMiddlewares,
            ...InspectorMiddlewares,
            ...DebugMiddlewares,
            ...GiiMiddlewares,
            ...OpenApiMiddlewares,
            // ...ToolbarApiMiddlewares,
        ]),
    devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useAppSelector as useSelector};
