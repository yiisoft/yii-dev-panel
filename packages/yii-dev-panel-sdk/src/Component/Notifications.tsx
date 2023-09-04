import {AlertColor} from '@mui/material';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Notification = {
    title?: string;
    text: string;
    color: AlertColor;
};
type State = {
    notifications: Notification[];
};

export const NotificationsSlice = createSlice({
    name: 'application',
    initialState: {
        notifications: [
            // {
            //     id: 1,
            //     text: 'This is a success message!',
            //     color: 'error',
            // },
            // {
            //     id: 2,
            //     text: 'This is a success message!',
            //     color: 'success',
            // },
        ],
    } as State,
    reducers: {
        removeNotification(state, action: PayloadAction<number>) {
            state.notifications = state.notifications.filter((n, index) => index !== action.payload);
        },
        addNotification: (state, action) => {
            state.notifications = [...state.notifications, action.payload];
        },
    },
});

export const {addNotification, removeNotification} = NotificationsSlice.actions;
