import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';
import { baseURL } from 'api/index';

import axios from 'axios';
import history from 'utils/history';
import auth_services from 'api/services/auth_services';
import { openNotification } from 'ducks/alert/actionCreator';

const setOtpToken = async (token: string) => {
  await localStorage.setItem('otpToken', token);
};

const setUserId = async (userId: string) => {
  await localStorage.setItem('otpUserId', userId);
};

export const getOtpToken = async () => await localStorage.getItem('otpToken');
export const getOtpUserId = async () => await localStorage.getItem('otpUserId');

export function* postLogin({ payload }: never) {
  try {
    const response = yield call(auth_services.postLogin, payload);

    if (response?.data) {
      localStorage.setItem('accessToken', response?.data?.accessToken);
      localStorage.setItem('userId', response?.data?.userId);

      yield put({
        type: TYPES.GET_AUTHENTICATION_SUCCESS,
        payload: response?.data,
      });
    } else {
      yield put({
        type: TYPES.GET_AUTHENTICATION_FAILED,
        payload: { success: false, message: 'Please try again.' },
      });
    }
  } catch (e) {
    yield put({
      type: TYPES.GET_AUTHENTICATION_FAILED,
      payload: e.response.data,
    });
  }
}

export function* postSignup({ payload }: never) {
  try {
    yield call(auth_services.postSignup, payload);
    yield put({ type: TYPES.POST_SIGNUP_SUCCESS });

    yield call(history.push, '/?register=true');
  } catch (e) {
    yield put({ type: TYPES.POST_SIGNUP_FAILED });
  }
}

export function* tokenChecker() {
  try {
    const response = yield call(auth_services.tokenChecker);

    if (response.data.code === 110) {
      yield put({ type: TYPES.GET_AUTHENTICATION_FAILED });
    } else {
      yield put({ type: TYPES.GET_AUTHENTICATION_SUCCESS });
    }
  } catch (e) {
    yield put({ type: TYPES.GET_AUTHENTICATION_FAILED });
  }
}

const filterCourses = (organizations: Array<any>, status: string) => {
  const courses = [];
  organizations.filter((x) =>
    x?.courses.map((y) => {
      if (y?.status === status) {
        courses.push(y);
      }
    })
  );
  return courses;
};

export function* getUserDetails() {
  const userId = localStorage.getItem('userId');
  try {
    const response = yield call(auth_services.getUser, userId);

    yield put({
      type: TYPES.GET_USER_DETAILS_SUCCESS,
      payload: response?.data?.data,
    });
  } catch (e) {
    yield put({ type: TYPES.GET_USER_DETAILS_FAILED });
  }
}

export function* postOtp({ payload }: any): any {
  const { data, callback = () => {} } = payload;

  callback({
    status: 200,
    message: '',
    loading: true,
  });

  try {
    const response = yield call(auth_services.postOtp, data);

    callback({
      status: response?.status,
      message: response?.data,
      loading: false,
    });

    return Promise.resolve(response);
  } catch (error) {
    callback({
      status: error?.response?.status,
      message: error?.response?.data?.message,
      loading: false,
    });

    return Promise.reject(error);
  }
}

export function* vertifyOtp({ payload }: any): any {
  const { data, callback = () => {} } = payload;

  callback({ status: 100, loading: true, message: '' });

  try {
    const response = yield call(auth_services.verifyOtp, data);
    callback({
      status: response?.status,
      message: response?.data,
      loading: false,
    });

    setUserId(response?.data?.userId);
    setOtpToken(response?.data?.accessToken);

    return Promise.resolve(response);
  } catch (error) {
    callback({
      status: error?.response?.status,
      message: error?.response?.data?.message,
      loading: false,
    });

    return Promise.reject(error);
  }
}

export function* register({ payload }: any): any {
  const { data, callback = () => {} } = payload;

  callback({ status: 100, loading: true, message: '' });

  try {
    const response = yield call(auth_services.register, data);
    callback({
      status: response?.status,
      message: response?.data?.accessToken,
      loading: false,
    });

    return Promise.resolve(response);
  } catch (error) {
    callback({
      status: error?.response?.status,
      message: error?.response?.data?.message,
      loading: false,
    });
    return Promise.reject(error);
  }
}

export function* resetPassword({ payload }: any): any {
  const { data, callback = () => {} } = payload;

  callback({ status: 100, loading: true, message: '' });

  const token = yield call(getOtpToken);
  const userId = yield call(getOtpUserId);

  try {
    const results = yield call(
      axios.patch,
      `${baseURL}/users/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = results?.data?.data;

    if (results?.status === 200) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userId', userId);

      yield put({
        type: TYPES.GET_AUTHENTICATION_SUCCESS,
        payload: results?.data?.data,
      });

      callback({
        status: results?.status,
        message: '',
        loading: false,
      });
    } else {
      callback({
        status: results?.status,
        message: res.message,
        loading: false,
      });
    }

    return Promise.resolve(res);
  } catch (error) {
    callback({
      status: error?.response?.status,
      message: error?.response?.data?.message,
      loading: false,
    });
    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.POST_OTP_REQUEST, postOtp);
  yield takeLatest(TYPES.VERIFY_OTP_REQUEST, vertifyOtp);
  yield takeLatest(TYPES.POST_SIGNUP_REQUEST, postSignup);
  yield takeLatest(TYPES.RESET_PASSWORD_OTP_REQUEST, resetPassword);
  yield takeLatest(TYPES.REGISTER_ACCOUNT_REQUEST, register);
  yield takeLatest(TYPES.TOKEN_CHECKER_REQUEST, tokenChecker);
  yield takeLatest(TYPES.GET_AUTHENTICATION_REQUEST, postLogin);
  yield takeLatest(TYPES.GET_USER_DETAILS_REQUEST, getUserDetails);
}
