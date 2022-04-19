import { TYPES } from './actionTypes';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * ================
     * Announcement reducer
     * ================
     * **/
    case TYPES.LIST_ANNOUNCEMENT_REQUEST:
      return {
        data: [],
        loading: true,
        error: false,
      };

    case TYPES.LIST_ANNOUNCEMENT_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        error: false,
      };

    case TYPES.LIST_ANNOUNCEMENT_FAILED:
      return {
        data: [],
        loading: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default reducer;
