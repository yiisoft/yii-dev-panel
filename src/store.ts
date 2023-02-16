import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {middlewares as ApplicationMiddlewares, reducers as ApplicationReducers} from './Application/api';
import {middlewares as InspectorMiddlewares, reducers as InspectorReducers} from './Module/Inspector/api';
import {middlewares as DebugMiddlewares, reducers as DebugReducers} from './Module/Debug/api';
import {middlewares as GiiMiddlewares, reducers as GiiReducers} from './Module/Gii/api';
import {FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

// TODO: get reducers and middlewares from modules.ts
const rootReducer = combineReducers({
    ...ApplicationReducers,
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
        }).concat([...ApplicationMiddlewares, ...InspectorMiddlewares, ...DebugMiddlewares, ...GiiMiddlewares]),
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
