import { takeLatest, put, call } from 'redux-saga/effects';
import { TYPES } from '../actionTypes';

import lms_service from 'api/services/lms_service';

export const quizId = async () => await localStorage.getItem('quizId');
export const topicId = async () => await localStorage.getItem('topicId');
export const courseId = async () => await localStorage.getItem('courseId');
export const lessonId = async () => await localStorage.getItem('lessonId');

export const organizationId = async () =>
  await localStorage.getItem('organizationId');

export function* deleteCourse({ payload }: any): any {
  const { idCourse, callback = () => {} } = payload;

  try {
    const response = yield call(lms_service.deleteCourse, idCourse);
    yield put({
      type: TYPES.DELETE_COURSE_SUCCESS,
      payload: response,
    });

    callback(response);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.DELETE_COURSE_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* deleteLesson({ payload }: any): any {
  const { idOrg, idCourse, idLesson, callback = () => {} } = payload;

  try {
    const response = yield call(lms_service.deleteLesson, idLesson);

    yield put({
      type: TYPES.DELETE_LESSON_SUCCESS,
      payload: response,
    });

    callback(response);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.DELETE_LESSON_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* deleteLessonContent({ payload }: any): any {
  const { idOrg, idCourse, idLesson, idContent, callback = () => {} } = payload;

  try {
    const response = yield call(
      lms_service.deleteLessonContent,
      idOrg,
      idCourse,
      idLesson,
      idContent
    );
    yield put({
      type: TYPES.DELETE_LESSON_CONTENT_SUCCESS,
      payload: response,
    });

    callback(response);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.DELETE_LESSON_CONTENT_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* deleteTopicContent({ payload }: any): any {
  const {
    idOrg,
    idCourse,
    idLesson,
    idContent,
    idTopic,
    callback = () => {},
  } = payload;

  try {
    const response = yield call(
      lms_service.deleteTopicContent,
      idOrg,
      idCourse,
      idLesson,
      idContent,
      idTopic
    );
    yield put({
      type: TYPES.DELETE_TOPIC_CONTENT_SUCCESS,
      payload: response,
    });

    callback(response);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.DELETE_TOPIC_CONTENT_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* deleteQuizQuestion({ payload }: any): any {
  const {
    idOrg,
    idCourse,
    idLesson,
    idQuiz,
    idQuestion,
    callback = () => {},
  } = payload;

  try {
    const response = yield call(
      lms_service.deleteQuizQuestion,
      idOrg,
      idCourse,
      idLesson,
      idQuiz,
      idQuestion
    );
    yield put({
      type: TYPES.DELETE_QUIZ_QUESTION_SUCCESS,
      payload: response,
    });

    callback(response);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.DELETE_QUIZ_QUESTION_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.DELETE_COURSE_REQUEST, deleteCourse);
  yield takeLatest(TYPES.DELETE_LESSON_REQUEST, deleteLesson);
  yield takeLatest(TYPES.DELETE_LESSON_CONTENT_REQUEST, deleteLessonContent);
  yield takeLatest(TYPES.DELETE_TOPIC_CONTENT_REQUEST, deleteTopicContent);
  yield takeLatest(TYPES.DELETE_QUIZ_QUESTION_REQUEST, deleteQuizQuestion);
}
