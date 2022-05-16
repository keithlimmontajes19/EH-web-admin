import { TYPES, notifType } from './actionTypes'


export const openNotification = (payload: notifType) => ({
    type: TYPES.ALERT_NOTIFICATION_REQUEST,
    payload
})

export const closeNotification = () => ({
    type: TYPES.ALERT_NOTIFICATION_FAILED,
    payload: {
        onShow: false,
        type: '',
        message: ''
    }
})