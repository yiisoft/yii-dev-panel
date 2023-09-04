import {AlertColor} from '@mui/material';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Notification = {
    title?: string;
    text: string;
    color: AlertColor;
    shown: boolean;
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
            state.notifications[action.payload].shown = false;
        },
        addNotification: (state, action: PayloadAction<Exclude<Notification, 'shown'>>) => {
            state.notifications = [...state.notifications, {...action.payload, shown: true}];
        },
    },
});

export const {addNotification, removeNotification} = NotificationsSlice.actions;
