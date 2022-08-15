import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";

import lms_service from "api/services/lms_service";

export const topicId = async () => await localStorage.getItem("topicId");
export const getUserId = async () => await localStorage.getItem("userId");
export const courseId = async () => await localStorage.getItem("courseId");
export const lessonId = async () => await localStorage.getItem("lessonId");
export const organizationId = async () =>
  await localStorage.getItem("organizationId");

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
    const response = yield call(lms_service.getMyCourses, userId);

    const data = response?.data?.data;
    const myCourses = data.length ? data : [];
    const ongoingCourses = filterCourses(data, "ongoing");
    const completedCourses = filterCourses(data, "completed");

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
    yield put({
      type: TYPES.GET_COURSES_LIST_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getAllCourses(): any {
  try {
    //getUserId to change to organizationId
    const idOrg = yield call(getUserId);
    const response = yield call(lms_service.getAllCourses, idOrg);
    yield put({
      type: TYPES.GET_ALL_COURSES_LIST_SUCCESS,
      payload: response?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_ALL_COURSES_LIST_FAILED,
    });

    return Promise.reject(error);
  }
}

export function* getReviews({ payload }: any): any {
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

export function* getCurriculum({ payload }: any): any {
  yield put({ type: TYPES.GET_COURSES_CURICULUM_SUCCESS, payload });
}

export function* getCurrilumDetails({ payload }: any): any {
  yield put({ type: TYPES.GET_CURICULUM_DETAILS_SUCCESS, payload });
}

export function* getLesson({ payload }: any): any {
  const { idList, callback = () => {} } = payload;

  let idCourse;
  let idOrg;

  if (idList) {
    idCourse = idList.idCourse;
    idOrg = idList.idOrg;
  } else {
    idCourse = yield call(courseId);
    idOrg = yield call(organizationId);
  }

  try {
    const response = yield call(lms_service.getLesson, idOrg, idCourse);

    console.log("response", response?.data);
    yield put({
      type: TYPES.GET_LESSONS_LIST_SUCCESS,
      payload: response?.data?.data,
    });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_LESSONS_LIST_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* getSingleLesson({ payload }: any): any {
  const { idOrg, idCourse, idLesson, callback = () => {} } = payload;

  try {
    const response = yield call(
      lms_service.getSingleLesson,
      idOrg,
      idCourse,
      idLesson
    );

    yield put({
      type: TYPES.GET_SINGLE_LESSON_SUCCESS,
      payload: response?.data?.data,
    });

    callback(response?.data?.data);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_SINGLE_LESSON_FAILED,
    });
    callback(false);
    return Promise.reject(error);
  }
}

export function* getLessonDetails({ payload }: any): any {
  const { idList, callback = () => {} } = payload;
  let idLesson;
  let idCourse;
  let idOrg;
  if (idList) {
    idLesson = idList.idLesson;
    idCourse = idList.idCourse;
    idOrg = idList.idOrg;
  } else {
    idLesson = yield call(lessonId);
    idCourse = yield call(courseId);
    idOrg = yield call(organizationId);
  }

  try {
    const response = yield call(
      lms_service.getLessonDetails,
      idOrg,
      idCourse,
      idLesson
    );

    yield put({
      type: TYPES.GET_CONTENTS_LIST_SUCCESS,
      payload: response?.data?.data,
    });

    callback(response?.data?.data);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_CONTENTS_LIST_FAILED,
    });
    callback(false);
    return Promise.reject(error);
  }
}

export function* getQuizQuestions({ payload }: any): any {
  const { idOrg, idCourse, idLesson, idQuiz, callback = () => {} } = payload;

  try {
    const response = yield call(
      lms_service.getQuizQuestions,
      idOrg,
      idCourse,
      idLesson,
      idQuiz
    );

    yield put({
      type: TYPES.GET_QUIZ_QUESTIONS_SUCCESS,
      payload: response?.data?.data,
    });

    callback(response?.data?.data);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.GET_QUIZ_QUESTIONS_FAILED,
    });
    callback(false);
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
      idOrg
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

export function* getTopicId({ payload }: any): any {
  yield put({ type: TYPES.ID_GET_TOPIC_SUCCESS, payload });
}

export function* getLessonId({ payload }: any): any {
  yield put({ type: TYPES.ID_GET_LESSON_SUCCESS, payload });
}

export function* getCourse({ payload }: any): any {
  const { callback = () => {} } = payload;

  const idOrg = yield call(organizationId);
  const idCourse = yield call(courseId);

  try {
    const res = yield call(lms_service.getCourse, idOrg, idCourse);

    yield put({
      type: TYPES.GET_COURSE_SUCCESS,
      payload: res.data,
    });

    console.log("res", res);
    callback(res.data);
  } catch (error) {
    console.log(error);
    yield put({
      type: TYPES.GET_COURSE_FAILED,
    });
    callback(false);
  }
}

export function* getCourseView({ payload }: any): any {
  const { idOrg, callback = () => {} } = payload;

  try {
    const res = yield call(lms_service.getCourseView, idOrg);

    yield put({
      type: TYPES.GET_COURSE_VIEW_SUCCESS,
      payload: res.data?.data,
    });
    callback(res.data?.data);
  } catch (error) {
    yield put({
      type: TYPES.GET_COURSE_VIEW_FAILED,
    });
    callback(false);
  }
}

export function* getCourseReportsStats({ payload }: any): any {
  const { callback = () => {} } = payload;

  try {
    const res = yield call(lms_service.getCourseReportsStats);

    yield put({
      type: TYPES.GET_COURSE_REPORTS_STATS_SUCCESS,
      payload: res.data?.data,
    });
    callback(res.data?.data);
  } catch (error) {
    yield put({
      type: TYPES.GET_COURSE_REPORTS_STATS_FAILED,
    });
    callback(false);
  }
}

export function* getAllUserReports({ payload }: any): any {
  const { callback = () => {} } = payload;

  try {
    const res = yield call(lms_service.getAllUserReports);

    yield put({
      type: TYPES.GET_ALL_USER_REPORTS_SUCCESS,
      payload: res.data?.data,
    });
    callback(res.data?.data);
  } catch (error) {
    yield put({
      type: TYPES.GET_ALL_USER_REPORTS_FAILED,
    });
    callback(false);
  }
}

export function* getUserCourseReports({ payload }: any): any {
  const { idOrg, idUser, callback = () => {} } = payload;

  try {
    const res = yield call(lms_service.getUserCourseReports, idOrg, idUser);

    yield put({
      type: TYPES.GET_USER_COURSE_REPORTS_SUCCESS,
      payload: res.data?.data,
    });
    callback(res.data?.data);
  } catch (error) {
    yield put({
      type: TYPES.GET_USER_COURSE_REPORTS_FAILED,
    });
    callback(false);
  }
}

export function* getUserCourseReportsDetails({ payload }: any): any {
  const { idOrg, idUser, idCourse, callback = () => {} } = payload;

  try {
    const res = yield call(
      lms_service.getUserCourseReportsDetails,
      idOrg,
      idUser,
      idCourse
    );

    yield put({
      type: TYPES.GET_USER_COURSE_REPORTS_DETAILS_SUCCESS,
      payload: res.data?.data,
    });
    callback(res.data?.data);
  } catch (error) {
    yield put({
      type: TYPES.GET_USER_COURSE_REPORTS_DETAILS_FAILED,
    });
    callback(false);
  }
}

export function* getUserDetails({ payload }: any): any {
  const { idUser, callback = () => {} } = payload;

  try {
    const res = yield call(lms_service.getUserDetails, idUser);

    yield put({
      type: TYPES.GET_COURSE_USER_DETAILS_SUCCESS,
      payload: res.data?.data,
    });
    callback(res.data?.data);
  } catch (error) {
    yield put({
      type: TYPES.GET_COURSE_USER_DETAILS_FAILED,
    });
    callback(false);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.GET_COURSE_REQUEST, getCourse);
  yield takeLatest(TYPES.ID_GET_TOPIC_REQUEST, getTopicId);
  yield takeLatest(TYPES.ID_GET_LESSON_REQUEST, getLessonId);
  yield takeLatest(TYPES.GET_LESSONS_LIST_REQUEST, getLesson);
  yield takeLatest(TYPES.GET_REVIEW_LIST_REQUEST, getReviews);
  yield takeLatest(TYPES.GET_COURSES_LIST_REQUEST, getMyCourses);
  yield takeLatest(TYPES.GET_SINGLE_LESSON_REQUEST, getSingleLesson);
  yield takeLatest(TYPES.GET_CONTENTS_LIST_REQUEST, getLessonDetails);
  yield takeLatest(TYPES.GET_QUIZ_QUESTIONS_REQUEST, getQuizQuestions);
  yield takeLatest(TYPES.GET_COURSES_CURICULUM_REQUEST, getCurriculum);
  yield takeLatest(TYPES.GET_CURICULUM_DETAILS_REQUEST, getCurrilumDetails);
  yield takeLatest(TYPES.GET_DETAILS_LESSONS_LIST_REQUEST, getTopicDetails);
  yield takeLatest(TYPES.GET_COURSE_VIEW_REQUEST, getCourseView);
  yield takeLatest(
    TYPES.GET_COURSE_REPORTS_STATS_REQUEST,
    getCourseReportsStats
  );
  yield takeLatest(TYPES.GET_ALL_USER_REPORTS_REQUEST, getAllUserReports);
  yield takeLatest(TYPES.GET_USER_COURSE_REPORTS_REQUEST, getUserCourseReports);
  yield takeLatest(
    TYPES.GET_USER_COURSE_REPORTS_DETAILS_REQUEST,
    getUserCourseReportsDetails
  );
  yield takeLatest(TYPES.GET_COURSE_USER_DETAILS_REQUEST, getUserDetails);
}
