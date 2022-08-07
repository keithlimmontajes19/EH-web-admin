import { TYPES } from "./actionTypes";

const INITIAL_STATE = {
  error: false,
  loading: false,
  authenticated: false,
  data: {},
  password_change: 0,
  user_details: {},
  users: {
    data: [],
    loading: false,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * AUTHENTICATION LOGIN
     */
    case TYPES.GET_AUTHENTICATION_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        authenticated: false,
      };

    case TYPES.GET_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: false,
        loading: false,
        authenticated: true,
      };

    case TYPES.GET_AUTHENTICATION_FAILED:
      return {
        ...state,
        data: action.payload,
        error: true,
        loading: false,
        authenticated: false,
      };

    /**
     * CHANGE PASSWORD
     */
    case TYPES.CHANGE_PASSWORD_SUCCESS:
    case TYPES.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        authenticated: false,
        password_change: action.payload,
      };

    case TYPES.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user_details: action.payload,
      };

    /**
     * GET ALL USERS
     */
    case TYPES.GET_USER_ALL_DETAILS_REQUEST:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
        },
      };

    case TYPES.GET_USER_ALL_DETAILS_SUCCESS:
      return {
        ...state,
        users: {
          data: action.payload,
          loading: false,
        },
      };

    case TYPES.GET_USER_ALL_DETAILS_FAILED:
      return {
        ...state,
        users: {
          data: [],
          loading: false,
        },
      };
    default:
      return { ...state };
  }
};

export default reducer;
