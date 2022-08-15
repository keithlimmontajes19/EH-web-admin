import { TYPES } from "./actionTypes";

const INITIAL_STATE = {
  organizations: {
    data: [],
    error: false,
    loading: false,
  },
  organization_members: {
    data: [],
    loading: false,
  },
  organization_id: null,
  organization_details: {},
  put_delete_post_status: false,
  error_put_delete_post_status: false,
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

    /**
     * ================
     * Members
     * ================
     * **/
    case TYPES.GET_MEMBERS_REQUEST:
      return {
        ...state,
        organization_members: {
          ...state.organization_members,
          loading: true,
        },
      };

    case TYPES.GET_MEMBERS_SUCCESS:
      return {
        ...state,
        organization_members: {
          data: action.payload,
          loading: false,
        },
      };

    case TYPES.GET_MEMBERS_FAILED:
      return {
        ...state,
        organization_members: {
          data: [],
          loading: false,
        },
      };

    /**
     * ================
     * POST PUT DELETE STATUS
     * ================
     * **/
    case TYPES.PUT_ORGANIZATION_REQUEST:
    case TYPES.POST_ORGANIZATION_REQUEST:
    case TYPES.DELETE_ORGANIZATION_REQUEST:
      return {
        ...state,
        put_delete_post_status: true,
        error_put_delete_post_status: false,
      };

    case TYPES.PUT_ORGANIZATION_SUCCESS:
    case TYPES.POST_ORGANIZATION_SUCCESS:
    case TYPES.DELETE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        put_delete_post_status: false,
        organization_id: action.payload,
        error_put_delete_post_status: false,
      };

    break;
    
    case TYPES.PUT_ORGANIZATION_FAILED:
    case TYPES.POST_ORGANIZATION_FAILED:
    case TYPES.DELETE_ORGANIZATION_FAILED:
      return {
        ...state,
        organization_id: null,
        put_delete_post_status: false,
        error_put_delete_post_status: true,
      };

    /**
     * ================
     * ORGANIZATION DETAILS
     * ================
     * **/
    case TYPES.GET_ORGANIZATION_DETAILS_REQUEST:
      return {
        ...state,
        organization_details: {},
      };

    case TYPES.GET_ORGANIZATION_DETAILS_SUCCESS:
      return {
        ...state,
        organization_details: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
