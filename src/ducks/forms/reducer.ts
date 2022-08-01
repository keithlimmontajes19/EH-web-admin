import { TYPES } from './actionTypes';

const INITIAL_STATE = {
  forms: {
    data: [],
    loading: false,
    error: false,
  },
  form: {
    data: {},
    loading: false,
    error: false,
  },
  results: {
    data: [],
    loading: false,
    error: false,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * ================
     * FORMS reducers
     * ================
     * **/
    case TYPES.LIST_FORMS_REQUEST:
      return {
        ...state,
        forms: {
          ...state.forms,
          loading: true,
          error: false,
        },
      };

    case TYPES.LIST_FORMS_SUCCESS:
      return {
        ...state,
        forms: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case TYPES.LIST_FORMS_FAILED:
      return {
        ...state,
        forms: {
          data: [],
          loading: false,
          error: true,
        },
      };

    /**
     * ================
     * GET ONE FORMS
     * ================
     * **/
    case TYPES.GET_ONE_FORMS_REQUEST:
      return {
        ...state,
        form: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case TYPES.GET_ONE_FORMS_SUCCESS:
      return {
        ...state,
        form: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case TYPES.GET_ONE_FORMS_FAILED:
      return {
        ...state,
        form: {
          data: {},
          loading: false,
          error: true,
        },
      };
    /**
     * ================
     * RESULTS reducers
     * ================
     * **/
    case TYPES.GET_ALL_RESULTS_REQUEST:
      return {
        ...state,
        results: {
          data: [],
          loading: true,
          error: false,
        },
      };

    case TYPES.GET_ALL_RESULTS_SUCCESS:
      return {
        ...state,
        results: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case TYPES.GET_ALL_RESULTS_FAILED:
      return {
        ...state,
        results: {
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
