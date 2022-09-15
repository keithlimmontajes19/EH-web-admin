import { TYPES } from "./actionTypes";

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  organizations: [],
  org_loading: false,
  announcement_by_user: {
    data: [],
    loading: false,
    error: false,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * ================
     * Announcement
     * ================
     * **/
    case TYPES.LIST_ANNOUNCEMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case TYPES.LIST_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };

    case TYPES.LIST_ANNOUNCEMENT_FAILED:
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
      };

    /**
     * ================
     * Organization
     * ================
     * **/
    case TYPES.GET_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        organizations: [],
        org_loading: true,
      };

    case TYPES.GET_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: action.payload,
        org_loading: false,
      };

    case TYPES.GET_ORGANIZATIONS_FAILED:
      return {
        ...state,
        organizations: [],
        org_loading: false,
      };

    /**
     * ================
     * Announcement reducer
     * ================
     * **/
    case TYPES.LIST_ANNOUNCEMENT_BY_USER_REQUEST:
      return {
        ...state,
        announcement_by_user: {
          ...state.announcement_by_user,
          loading: true,
          error: false,
        },
      };

    case TYPES.LIST_ANNOUNCEMENT_BY_USER_SUCCESS:
      return {
        ...state,
        announcement_by_user: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case TYPES.LIST_ANNOUNCEMENT_BY_USER_FAILED:
      return {
        ...state,
        announcement_by_user: {
          data: [],
          loading: false,
          error: true,
        },
      };

    default:
      return { ...state };
  }
};

export default reducer;
