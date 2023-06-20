import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
    middlewares as ApplicationMiddlewares,
    reducers as ApplicationReducers,
} from '@yiisoft/yii-dev-panel-sdk/API/Application/api';
import {middlewares as DebugMiddlewares, reducers as DebugReducers} from '@yiisoft/yii-dev-panel-sdk/API/Debug/api';
import {
    middlewares as ToolbarApiMiddlewares,
    reducers as ToolbarApiReducers,
} from '@yiisoft/yii-dev-toolbar/Module/Toolbar/api';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';

// TODO: get reducers and middlewares from modules.ts
const rootReducer = combineReducers({
    ...ToolbarApiReducers,
    ...DebugReducers,
    ...ApplicationReducers,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([...ToolbarApiMiddlewares, ...DebugMiddlewares, ...ApplicationMiddlewares]),
    devTools: import.meta.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useAppSelector as useSelector};
