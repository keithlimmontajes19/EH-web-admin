import {takeLatest, put, call} from 'redux-saga/effects';
import {TYPES} from '../actionTypes';

import lms_service from 'api/services/lms_service';

export const topicId = async () => await localStorage.getItem('topicId');
export const getUserId = async () => await localStorage.getItem('userId');
export const courseId = async () => await localStorage.getItem('courseId');
export const lessonId = async () => await localStorage.getItem('lessonId');
export const organizationId = async () =>
  await localStorage.getItem('organizationId');

const filterCourses = (course: Array<any>, status: string) => {
  const courses = [];
  course.filter((x) => {
    if (x?.progress?.status === status) {
      courses.push(x);
    }
  });
  return courses;
};

export function* getMyCourses(): any {
  const userId = yield call(getUserId);

  try {
    const response = yield call(lms_service.getAllCourses, userId);

    const data = response?.data?.data;
    const myCourses = data.length ? data : [];
    const ongoingCourses = filterCourses(data, 'ongoing');
    const completedCourses = filterCourses(data, 'completed');

    yield put({
      type: TYPES.GET_COURSES_LIST_SUCCESS,
      payload: {
        data,
        ongoingCourses,
        completedCourses,
        myCourses: myCourses.slice(0, 3),
      },
    });

    return Promise.resolve(response);
  } catch (error) {
    console.log(error);
    yield put({
      type: TYPES.GET_COURSES_LIST_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getReviews({payload}: any): any {
  try {
    const response = yield call(lms_service.getReview, payload);
    yield put({
      type: TYPES.GET_REVIEW_LIST_SUCCESS,
      payload: response?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_REVIEW_LIST_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getCurriculum({payload}: any): any {
  yield put({type: TYPES.GET_COURSES_CURICULUM_SUCCESS, payload});
}

export function* getCurrilumDetails({payload}: any): any {
  yield put({type: TYPES.GET_CURICULUM_DETAILS_SUCCESS, payload});
}

export function* getLesson(): any {
  const idCourse = yield call(courseId);
  const idOrg = yield call(organizationId);

  try {
    const response = yield call(lms_service.getLesson, idOrg, idCourse);

    yield put({
      type: TYPES.GET_LESSONS_LIST_SUCCESS,
      payload: response?.data?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_LESSONS_LIST_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getLessonDetails(): any {
  const idLesson = yield call(lessonId);
  const idCourse = yield call(courseId);
  const idOrg = yield call(organizationId);

  try {
    const response = yield call(
      lms_service.getLessonDetails,
      idOrg,
      idCourse,
      idLesson,
    );

    yield put({
      type: TYPES.GET_CONTENTS_LIST_SUCCESS,
      payload: response?.data?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_CONTENTS_LIST_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getTopicDetails(): any {
  const idLesson = yield call(lessonId);
  const idTopic = yield call(topicId);
  const idCourse = yield call(courseId);
  const idOrg = yield call(organizationId);

  try {
    const response = yield call(
      lms_service.getTopicDetails,
      idCourse,
      idLesson,
      idTopic,
      idOrg,
    );

    yield put({
      type: TYPES.GET_DETAILS_LESSONS_LIST_SUCCESS,
      payload: response?.data?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_DETAILS_LESSONS_LIST_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getTopicId({payload}: any): any {
  yield put({type: TYPES.ID_GET_TOPIC_SUCCESS, payload});
}

export function* getLessonId({payload}: any): any {
  yield put({type: TYPES.ID_GET_LESSON_SUCCESS, payload});
}

export default function* watcher() {
  yield takeLatest(TYPES.ID_GET_TOPIC_REQUEST, getTopicId);
  yield takeLatest(TYPES.ID_GET_LESSON_REQUEST, getLessonId);
  yield takeLatest(TYPES.GET_LESSONS_LIST_REQUEST, getLesson);
  yield takeLatest(TYPES.GET_REVIEW_LIST_REQUEST, getReviews);
  yield takeLatest(TYPES.GET_COURSES_LIST_REQUEST, getMyCourses);
  yield takeLatest(TYPES.GET_CONTENTS_LIST_REQUEST, getLessonDetails);
  yield takeLatest(TYPES.GET_COURSES_CURICULUM_REQUEST, getCurriculum);
  yield takeLatest(TYPES.GET_CURICULUM_DETAILS_REQUEST, getCurrilumDetails);
  yield takeLatest(TYPES.GET_DETAILS_LESSONS_LIST_REQUEST, getTopicDetails);
}
