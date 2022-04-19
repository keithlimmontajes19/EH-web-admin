import {TYPES} from './actionTypes';

const INITIAL_STATE = {
  data: [],
  error: false,
  loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * ==================
     * DASHBOARD reducer
     * ==================
     * **/
    case TYPES.LIST_DASHBOARD_REQUEST:
      return {
        data: state.data,
        error: false,
        loading: true,
      };

    case TYPES.LIST_DASHBOARD_SUCCESS:
      return {
        error: false,
        loading: false,
        data: action.payload,
      };

    case TYPES.LIST_DASHBOARD_FAILED:
      return {
        data: [],
        error: true,
        loading: false,
      };

    default:
      return {...state};
  }
};

export default reducer;
