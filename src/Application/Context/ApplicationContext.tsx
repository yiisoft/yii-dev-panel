import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const ApplicationSlice = createSlice({
    name: 'application',
    initialState: {
        baseUrl: process.env.REACT_APP_BACKEND_URL,
        preferredPageSize: 20,
        favoriteUrls: [] as string[],
    },
    reducers: {
        changeBaseUrl(state, action: PayloadAction<string>) {
            state.baseUrl = action.payload;
        },
        setPreferredPageSize(state, action: PayloadAction<number>) {
            state.preferredPageSize = action.payload;
        },
        addFavoriteUrl(state, action: PayloadAction<string>) {
            const set = new Set(state.favoriteUrls);
            state.favoriteUrls = Array.from(set.add(action.payload).values());
        },
        removeFavoriteUrl(state, action: PayloadAction<string>) {
            const set = new Set(state.favoriteUrls);
            set.delete(action.payload);
            state.favoriteUrls = Array.from(set.values());
        },
    },
});

export const {changeBaseUrl, setPreferredPageSize, addFavoriteUrl, removeFavoriteUrl} = ApplicationSlice.actions;
