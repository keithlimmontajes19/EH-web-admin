import { TYPES } from './actionTypes';

type loginTypes = {
  email: 'string';
  password: 'string';
};

export const postLogin = (payload: loginTypes) => ({
  type: TYPES.GET_AUTHENTICATION_REQUEST,
  payload,
});

export const postSignup = (payload) => ({
  type: TYPES.POST_SIGNUP_REQUEST,
  payload,
});

export const checkTokenUser = () => ({
  type: TYPES.TOKEN_CHECKER_REQUEST,
});

export const changePassword = (payload) => ({
  type: TYPES.CHANGE_PASSWORD_REQUEST,
  payload,
});

export const forgotPassword = (payload) => ({
  type: TYPES.FORGOT_PASSWORD_REQUEST,
  payload,
});

export const getUserDetails = () => ({
  type: TYPES.GET_USER_DETAILS_REQUEST,
});

export const patchUserDetails = (userId, data) => ({
  type: TYPES.PATCH_USER_PROFILE_REQUEST,
  payload: {
    userId,
    data,
  },
});
