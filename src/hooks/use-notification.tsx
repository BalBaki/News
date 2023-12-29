import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addNotification } from '../store';
import type { NotificationType } from '../types/notification.interface';

interface Payload {
    type: NotificationType;
    message: string;
    duration?: number;
}

const useNotification = () => {
    const dispatch = useDispatch();

    return useCallback((data: Payload) => {
        dispatch(addNotification({ ...data, id: nanoid(), time: Date.now(), duration: data.duration ?? 5 }));
    }, []);
};

export { useNotification };
