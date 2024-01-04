import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Notification } from '../../types';

const initialState: Notification[] = [];

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.push(action.payload);
        },
        removeNotification: (state, action: PayloadAction<Notification>) => {
            return state.filter((notification) => notification.id !== action.payload.id);
        },
        updateNotifications: (state, action: PayloadAction<Notification[]>) => {
            return action.payload;
        },
    },
});

export { notificationsSlice };
export const { addNotification, removeNotification, updateNotifications } = notificationsSlice.actions;
