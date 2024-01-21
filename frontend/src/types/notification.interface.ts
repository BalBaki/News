export type NotificationType = 'success' | 'error';

export interface Notification {
    id: string;
    type: NotificationType;
    duration: number;
    message: string | string[] | Object;
    time: number;
}
