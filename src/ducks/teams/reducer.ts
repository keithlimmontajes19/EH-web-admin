import { TYPES } from './actionTypes';

const INITIAL_STATE = {
  folder: {
    data: {},
    loading: false,
    error: false,
  },
  folders: {
    data: [],
    loading: false,
    error: false,
  },
  page: {
    data: {},
    loading: false,
    error: false,
  },
  pages: {
    data: [],
    loading: false,
    error: false,
  },
  page_details: {
    data: {},
    loading: false,
    error: false,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * ================
     * FOLDERS reducers
     * ================
     * **/
    case TYPES.LIST_FOLDERS_REQUEST:
      return {
        ...state,
        folders: {
          data: [],
          loading: true,
          error: false,
        },
      };

    case TYPES.LIST_FOLDERS_SUCCESS:
      return {
        ...state,
        folders: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case TYPES.LIST_FOLDERS_FAILED:
      return {
        ...state,
        folders: {
          data: [],
          loading: false,
          error: true,
        },
      };

    case TYPES.GET_ONE_FOLDER_REQUEST:
      return {
        ...state,
        folder: {
          data: [],
          loading: true,
          error: false,
        },
      };

    case TYPES.GET_ONE_FOLDER_SUCCESS:
      return {
        ...state,
        folder: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case TYPES.GET_ONE_FOLDER_FAILED:
      return {
        ...state,
        folder: {
          data: [],
          loading: false,
          error: true,
        },
      };

    /**
     * ================
     * PAGES reducers
     * ================
     * **/
    case TYPES.LIST_PAGES_REQUEST:
      return {
        ...state,
        pages: {
          data: [],
          loading: true,
          error: false,
        },
      };

    case TYPES.LIST_PAGES_SUCCESS:
      return {
        ...state,
        pages: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case TYPES.LIST_PAGES_FAILED:
      return {
        ...state,
        pages: {
          data: [],
          loading: false,
          error: true,
        },
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

    case TYPES.GET_PAGE_DETAILS_SUCCESS:
      return {
        ...state,
        page_details: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    default:
      return { ...state };
  }
};

export default reducer;
