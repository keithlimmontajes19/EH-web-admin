import { TYPES } from "./actionTypes";

const INITIAL_STATE = {
  organizations: {
    data: [],
    error: false,
    loading: false,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * ================
     * Organization
     * ================
     * **/
    case TYPES.LIST_DEPARTMENT_REQUEST:
      return {
        ...state,
        organizations: {
          data: [],
          error: false,
          loading: true,
        },
      };

    case TYPES.LIST_DEPARTMENT_SUCCESS:
      return {
        ...state,
        organizations: {
          data: action.payload,
          error: false,
          loading: false,
        },
      };

    case TYPES.LIST_DEPARTMENT_FAILED:
      return {
        ...state,
        organizations: {
          data: [],
          error: true,
          loading: false,
        },
      };

    default:
      return { ...state };
  }
};

export default reducer;
