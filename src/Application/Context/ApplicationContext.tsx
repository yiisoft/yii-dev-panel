import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const ApplicationSlice = createSlice({
    name: 'application',
    initialState: {
        baseUrl: process.env.REACT_APP_BACKEND_URL,
        preferredPageSize: 20,
    },
    reducers: {
        changeBaseUrl(state, action: PayloadAction<string>) {
            state.baseUrl = action.payload;
        },
        setPreferredPageSize(state, action: PayloadAction<number>) {
            state.preferredPageSize = action.payload;
        },
    },
});

export const {changeBaseUrl, setPreferredPageSize} = ApplicationSlice.actions;
