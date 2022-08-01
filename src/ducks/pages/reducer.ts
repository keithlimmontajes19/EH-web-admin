import { TYPES } from './actionTypes';

const INITIAL_STATE = {
  data: [],
  error: false,
  loading: false,
  page: {
    data: [],
    loading: false,
    error: false,
  },
  pages: {
    data: [],
    loading: false,
    error: false,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * ================
     * PAGES reducers
     * ================
     * **/
    case TYPES.LIST_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case TYPES.LIST_PAGE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case TYPES.LIST_PAGE_FAILED:
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
      };
    case TYPES.GET_ONE_PAGE_REQUEST:
      return {
        ...state,
        page: {
          data: [],
          loading: true,
          error: false,
        },
      };
    case TYPES.GET_ONE_PAGE_SUCCESS:
      return {
        ...state,
        page: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };
    case TYPES.GET_ONE_PAGE_FAILED:
      return {
        ...state,
        page: {
          data: [],
          loading: false,
          error: true,
        },
      };
    /**
     * ================
     *  ADD PAGES reducers
     * ================
     * **/
    case TYPES.ADD_PAGE_REQUEST:
      return {
        ...state,
        page: {
          data: [],
          loading: true,
          error: false,
        },
      };
    case TYPES.ADD_PAGE_SUCCESS:
      return {
        ...state,
        page: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };
    case TYPES.ADD_PAGE_FAILED:
      return {
        ...state,
        page: {
          data: [],
          loading: false,
          error: true,
        },
      };

    /**
     * ================
     *  EDIT PAGES reducers
     * ================
     * **/
    case TYPES.EDIT_PAGE_REQUEST:
      return {
        ...state,
        page: {
          data: [],
          loading: true,
          error: false,
        },
      };
    case TYPES.EDIT_PAGE_SUCCESS:
      return {
        ...state,
        page: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };
    case TYPES.EDIT_PAGE_FAILED:
      return {
        ...state,
        page: {
          data: [],
          loading: false,
          error: true,
        },
      };
    /**
     * ================
     *  DeLETE PAGES reducers
     * ================
     * **/
    case TYPES.DELETE_PAGE_REQUEST:
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
      };
    case TYPES.DELETE_PAGE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case TYPES.EDIT_PAGE_FAILED:
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default reducer;
