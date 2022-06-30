import { TYPES } from "./actionTypes";

export const getOnboardingList = () => ({
  type: TYPES.GET_ONBOARDING_LIST_REQUEST,
});

export const getOneOnboarding = (payload: any) => ({
  type: TYPES.GET_ONE_ONBOARDING_REQUEST,
  payload,
});

export const deleteOnboading = (payload: any) => ({
  type: TYPES.DELETE_ONBOARDING_REQUEST,
  payload,
});

export const editOnboarding = (payload: any, id: any) => ({
  type: TYPES.EDIT_ONBOARDING_REQUEST,
  payload: {
    values: payload,
    id,
  },
});

export const postOnboarding = (payload: any) => ({
  type: TYPES.POST_ONBOARDING_REQUEST,
  payload,
});

export const publishOnboarding = (payload: any) => ({
  type: TYPES.PUBLISH_ONBOARDING_REQUEST,
  payload,
});
