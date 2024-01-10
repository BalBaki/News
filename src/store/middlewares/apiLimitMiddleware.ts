import { nanoid } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

const ADD_NOTIFICATION = 'notifications/addNotification';

export const apiLimitMiddleware: Middleware = (store) => {
    return (next) => {
        return (action: any) => {
            const result = next(action);

            if (
                action?.error?.message === 'Rejected' &&
                action?.payload?.status === 429 &&
                !action?.payload?.data?.access
            ) {
                store.dispatch({
                    type: ADD_NOTIFICATION,
                    payload: {
                        duration: 5,
                        type: 'error',
                        message: action?.payload?.data?.error || 'Too Much Request. Wait a few minute',
                        id: nanoid(),
                        time: Date.now(),
                    },
                });
            }

            return result;
        };
    };
};
