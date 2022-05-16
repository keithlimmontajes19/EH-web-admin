import { TYPES } from './actionTypes';

const INITIAL_STATE = {
  onShow: false,
  type: '',
  message: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.ALERT_NOTIFICATION_SUCCESS:
      return {
        onShow: action.payload.onShow,
        type: action.payload.type,
        message: action.payload.message
      };

    case TYPES.ALERT_NOTIFICATION_FAILED:
      return {
        onShow: false,
        type: '',
        message: ''
      };

    default:
      return { ...state };
  }
};

export default reducer;