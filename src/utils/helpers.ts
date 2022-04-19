import moment from "moment";

export const rulesConfig = (message = 'This field is required!') => [
    {
        required: true,
        message: message,
    },
];

export const TimeTextChecker = () => {
    const currentHour: any = moment().format("HH");

    if (currentHour >= 3 && currentHour < 12) {
        return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 15) {
        return "Good Afternoon";
    } else if (currentHour >= 15 && currentHour < 20) {
        return "Good Evening";
    } else if (currentHour >= 20 && currentHour < 3) {
        return "Good Night";
    } else {
        return "Hello"
    }

}