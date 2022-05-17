import { TYPES } from './actionTypes';

const INITIAL_STATE = {
  data: [],
  error: false,
  loading: false,
  single_dashboard: {
    data: [],
    loading: false,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * ==================
     * DASHBOARD reducer
     * ==================
     * **/
    case TYPES.LIST_DASHBOARD_REQUEST:
      return { ...state, data: state.data, error: false, loading: true };

    case TYPES.LIST_DASHBOARD_SUCCESS:
      return { ...state, error: false, loading: false, data: action.payload };

    case TYPES.LIST_DASHBOARD_FAILED:
      return { ...state, data: [], error: true, loading: false };

    /**
     * ==================
     * DASHBOARD GET ONE
     * ==================
     * **/
    case TYPES.GET_ONE_DASHBOARD_REQUEST:
      return {
        ...state,
        single_dashboard: {
          data: [],
          error: true,
        },
      };

    case TYPES.GET_ONE_DASHBOARD_SUCCESS:
      return {
        ...state,
        single_dashboard: {
          data: action.payload,
          error: true,
        },
      };

    case TYPES.GET_ONE_DASHBOARD_FAILED:
      return {
        ...state,
        single_dashboard: {
          data: [],
          error: true,
        },
      };

    default:
      return { ...state };
  }
};

export default reducer;
