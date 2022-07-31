import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";
import {inspectorApi} from "./API/Inspector/Inspector";

export const store = configureStore({
    reducer: {
        [inspectorApi.reducerPath]: inspectorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(inspectorApi.middleware),
})

setupListeners(store.dispatch)



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
