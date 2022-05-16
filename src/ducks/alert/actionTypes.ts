export const TYPES = {
    ALERT_NOTIFICATION_REQUEST: 'ALERT_NOTIFICATION_REQUEST',
    ALERT_NOTIFICATION_SUCCESS: 'ALERT_NOTIFICATION_SUCCESS',
    ALERT_NOTIFICATION_FAILED: 'ALERT_NOTIFICATION_FAILED',
}

export type notifType = {
    onShow: boolean,
    type: 'success' | 'error' | 'warning',
    message: string
}
