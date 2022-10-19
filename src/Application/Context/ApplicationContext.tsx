import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const ApplicationSlice = createSlice({
    name: 'application',
    initialState: {
        baseUrl: process.env.REACT_APP_BACKEND_URL,
    },
    reducers: {
        changeBaseUrl(state, action: PayloadAction<string>) {
            state.baseUrl = action.payload
        },
    },
})

export const {changeBaseUrl} = ApplicationSlice.actions
