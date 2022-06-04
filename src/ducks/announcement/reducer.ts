import { TYPES } from './actionTypes';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  deletepagedata: [],
  // LIST_ORGANIZATIONS_SUCCESS
  organizations: []
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
        ...state,
        data: [],
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
    case TYPES.LIST_ANNOUNCEMENTS_REQUEST:
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
      };
    case TYPES.LIST_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false
      }
    case TYPES.LIST_ANNOUNCEMENTS_FAILED:
      return {
        ...state,
        data: [],
        loading: false,
        error: true
      }

    case TYPES.LIST_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        data: [],
        loading: true,
        error: false

      }
    case TYPES.LIST_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        data: [...state.data],
        organizations: action.payload,
        loading: false,
        error: false
      }
    case TYPES.LIST_ORGANIZATIONS_FAILED:
      return {
        ...state,
        data: [],
        loading: false,
        error: true
      }

    case TYPES.DELETE_ANNOUNCEMENT_REQUEST:
      return {
        ...state,
        deletepagedata: action.payload,
        loading: false,
        error: false
      }
    case TYPES.DELETE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        deletepagedata: action.payload,
        loading: false,
        error: false,

      }
    case TYPES.DELETE_ANNOUNCEMENT_FAILED:
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
      }

    default:
      return { ...state };
  }
};

export default reducer;
