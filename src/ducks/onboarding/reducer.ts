import { TYPES } from "./actionTypes";

const INITIAL_STATE = {
  onboarding_you: {
    data: {},
    loading: false,
    error: false,
  },
  onboarding_list: {
    data: [],
    loading: false,
    error: false,
  },
  onboarding: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.POST_ONBOARDING_YOU_REQUEST:
      return {
        ...state,
        onboarding_you: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case TYPES.POST_ONBOARDING_YOU_SUCCESS:
      return {
        ...state,
        onboarding_you: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case TYPES.POST_ONBOARDING_YOU_FAILED:
      return {
        ...state,
        onboarding_you: {
          data: action.payload,
          loading: false,
          error: true,
        },
      };

    /**
     * ==================
     * ONBOARDING LIST
     * ==================
     */

    case TYPES.GET_ONBOARDING_LIST_REQUEST:
      return {
        ...state,
        onboarding_list: {
          data: [],
          loading: true,
          error: false,
        },
      };

    case TYPES.GET_ONBOARDING_LIST_SUCCESS:
      return {
        ...state,
        onboarding_list: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };

    case TYPES.GET_ONBOARDING_LIST_FAILED:
      return {
        ...state,
        onboarding_list: {
          data: [],
          loading: false,
          error: true,
        },
      };

    /**
     * ==================
     * GET ONE ONBOARDING
     * ==================
     */

    case TYPES.GET_ONE_ONBOARDING_REQUEST:
      return {
        ...state,
        onboarding: {},
      };

    case TYPES.GET_ONE_ONBOARDING_SUCCESS:
      return {
        ...state,
        onboarding: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
