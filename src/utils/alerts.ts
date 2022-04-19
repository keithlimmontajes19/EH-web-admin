import { notification } from "antd";

type notificationType = 'success' | 'warning' | 'error';

const notifTitle = (type: notificationType) => {
    switch (type) {
        case 'success':
            return 'Success'
        case 'warning':
            return 'Warning'
        case 'error':
            return 'Error'
        default:
            return ''
    }
}

const notifColor = (type: notificationType) => {
    switch (type) {
        case 'success':
            return '#f6ffed'
        case 'warning':
            return '#fffbe6'
        default:
            return '#ffcccb'
    }
}

export const notificationAlert = (type: notificationType, message: string, onClose: any) => {
    {
        notification[type]({
            message: notifTitle(type),
            description: message,
            placement: "bottomRight",
            style: { background: notifColor(type), width: 300, borderRadius: 6 },
            onClose: onClose
        })
    }
}