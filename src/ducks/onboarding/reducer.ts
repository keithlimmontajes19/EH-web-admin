import { TYPES } from './actionTypes';

const INITIAL_STATE = {
  onboarding_you: {
    data: {},
    loading: false,
    error: false
  }
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.POST_ONBOARDING_YOU_REQUEST:
      return {
        onboarding_you: {
          data: {},
          loading: true,
          error: false
        }
      };

    case TYPES.POST_ONBOARDING_YOU_SUCCESS:
      return {
        onboarding_you: {
          data: action.payload,
          loading: false,
          error: false
        }
      };

    case TYPES.POST_ONBOARDING_YOU_FAILED:
      return {
        onboarding_you: {
          data: action.payload,
          loading: false,
          error: true
        }
      };


    default:
      return { ...state };
  }
};

export default reducer;