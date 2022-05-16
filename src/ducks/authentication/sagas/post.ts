import {takeLatest, put, call} from 'redux-saga/effects';
import {TYPES} from '../actionTypes';

import auth_services from 'api/services/auth_services';
import history from 'utils/history';

export function* postLogin({payload}: never) {
  try {
    const response = yield call(auth_services.postLogin, payload);
    localStorage.setItem('accessToken', response?.data?.accessToken);
    localStorage.setItem('userId', response?.data?.userId);

    yield put({
      type: TYPES.GET_AUTHENTICATION_SUCCESS,
      payload: response?.data,
    });
  } catch (e) {
    yield put({
      type: TYPES.GET_AUTHENTICATION_FAILED,
      payload: e.response.data,
    });
  }
}

export function* postSignup({payload}: never) {
  try {
    yield call(auth_services.postSignup, payload);
    yield put({type: TYPES.POST_SIGNUP_SUCCESS});

    yield call(history.push, '/?register=true');
  } catch (e) {
    yield put({type: TYPES.POST_SIGNUP_FAILED});
  }
}

export function* tokenChecker() {
  try {
    const response = yield call(auth_services.tokenChecker);

    if (response.data.code === 110) {
      yield put({type: TYPES.GET_AUTHENTICATION_FAILED});
    } else {
      yield put({type: TYPES.GET_AUTHENTICATION_SUCCESS});
    }
  } catch (e) {
    yield put({type: TYPES.GET_AUTHENTICATION_FAILED});
  }
}

const filterCourses = (organizations: Array<any>, status: string) => {
  const courses = [];
  organizations.filter((x) =>
    x?.courses.map((y) => {
      if (y?.status === status) {
        courses.push(y);
      }
    }),
  );
  return courses;
};

export function* getUserDetails() {
  const userId = localStorage.getItem('userId');
  try {
    const response = yield call(auth_services.getUser, userId);

    const data = response?.data?.data ? response?.data?.data : {};
    const ongoingCourses = filterCourses(data?.organizations, 'ongoing');
    const completedCourses = filterCourses(data?.organizations, 'completed');
    const myCourses = data?.organizations.length
      ? data?.organizations[0].courses
      : [];

    yield put({
      type: TYPES.GET_USER_DETAILS_SUCCESS,
      payload: {
        data,
        ongoingCourses,
        completedCourses,
        myCourses: myCourses.slice(0, 3),
      },
    });
  } catch (e) {
    yield put({type: TYPES.GET_USER_DETAILS_FAILED});
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.GET_AUTHENTICATION_REQUEST, postLogin);
  yield takeLatest(TYPES.POST_SIGNUP_REQUEST, postSignup);
  yield takeLatest(TYPES.TOKEN_CHECKER_REQUEST, tokenChecker);
  yield takeLatest(TYPES.GET_USER_DETAILS_REQUEST, getUserDetails);
}
