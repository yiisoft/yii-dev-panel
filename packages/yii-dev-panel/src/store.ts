import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
    middlewares as ApplicationMiddlewares,
    reducers as ApplicationReducers,
} from '@yiisoft/yii-dev-panel-sdk/API/Application/api';
import {middlewares as DebugMiddlewares, reducers as DebugReducers} from '@yiisoft/yii-dev-panel-sdk/API/Debug/api';
import {middlewares as FramesMiddlewares, reducers as FramesReducers} from '@yiisoft/yii-dev-panel/Module/Frames/api';
import {middlewares as GiiMiddlewares, reducers as GiiReducers} from '@yiisoft/yii-dev-panel/Module/Gii/api';
import {
    middlewares as InspectorMiddlewares,
    reducers as InspectorReducers,
} from '@yiisoft/yii-dev-panel/Module/Inspector/api';
import {
    middlewares as OpenApiMiddlewares,
    reducers as OpenApiReducers,
} from '@yiisoft/yii-dev-panel/Module/OpenApi/api';
// import {middlewares as ToolbarApiMiddlewares, reducers as ToolbarApiReducers} from './Module/Toolbar/api';
import {errorNotificationMiddleware} from '@yiisoft/yii-dev-panel-sdk/API/errorNotificationMiddleware';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';

// TODO: get reducers and middlewares from modules.ts
const rootReducer = combineReducers({
    ...ApplicationReducers,
    ...InspectorReducers,
    ...DebugReducers,
    ...GiiReducers,
    ...OpenApiReducers,
    ...FramesReducers,
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
            ...FramesMiddlewares,
            // ...ToolbarApiMiddlewares,
            errorNotificationMiddleware,
        ]),
    devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useAppSelector as useSelector};
