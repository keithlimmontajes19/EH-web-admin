import { takeLatest, put, call } from "redux-saga/effects";
import { TYPES } from "../actionTypes";

import lms_service from "api/services/lms_service";

export const quizId = async () => await localStorage.getItem("quizId");
export const topicId = async () => await localStorage.getItem("topicId");
export const courseId = async () => await localStorage.getItem("courseId");
export const lessonId = async () => await localStorage.getItem("lessonId");

export const organizationId = async () =>
  await localStorage.getItem("organizationId");

export function* updateCourse({ payload }: any): any {
  const idCourse = yield call(courseId);

  const {
    title,
    description,
    preview,
    instructor,
    callback = () => {},
    points = false,
  } = payload;
  const data = {
    title,
    description,
    body: `&lt;html&gt;&lt;body&gt;&lt;p&gt;${description}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;`,
    preview: { type: preview.type },
    instructor,
  };

  try {
    const response = yield call(
      lms_service.updateCourse,
      points ? { ...data, points } : data,
      idCourse
    );
    yield put({
      type: TYPES.PUT_UPDATE_COURSE_SUCCESS,
      payload: response,
    });

    const { course, uploadSignedUrl } = response?.data?.data;
    callback({ ...course, uploadSignedUrl });
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.PUT_UPDATE_COURSE_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* postCourse({ payload }: any): any {
  const { data, callback = () => {} } = payload;

  try {
    const response = yield call(lms_service.postCourse, data);
    yield put({
      type: TYPES.POST_COURSE_SUCCESS,
      payload: response.data,
    });

    const { course } = response?.data?.data;

    callback({ ...course });
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.POST_COURSE_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* updateLesson({ payload }: any): any {
  const { idOrg, idCourse, idLesson, callback = () => {} } = payload;
  const { title, description, preview, position } = payload.data;
  const data = {
    title,
    description,
    body: `&lt;html&gt;&lt;body&gt;&lt;p&gt;${description}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;`,
    preview: { type: preview.type },
    position,
  };

  try {
    const response = yield call(
      lms_service.updateLesson,
      data,
      idOrg,
      idCourse,
      idLesson
    );
    yield put({
      type: TYPES.PUT_UPDATE_LESSON_SUCCESS,
      payload: response,
    });

    const { lesson, uploadSignedUrl } = response?.data?.data;
    callback({ ...lesson, uploadSignedUrl });
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.PUT_UPDATE_LESSON_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* postLesson({ payload }: any): any {
  const { idOrg, idCourse, callback = () => {} } = payload;
  const { title, description, preview, position } = payload.data;
  const data = {
    title,
    description,
    body: `&lt;html&gt;&lt;body&gt;&lt;p&gt;${description}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;`,
    preview: { type: preview.type },
    position,
  };

  try {
    const response = yield call(lms_service.postLesson, {
      ...data,
      courseId: idCourse,
    });

    yield put({
      type: TYPES.POST_LESSON_SUCCESS,
      payload: response.data,
    });

    const { lesson, uploadSignedUrl } = response?.data?.data;
    callback({ ...lesson, uploadSignedUrl });

    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.POST_LESSON_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* updateLessonContent({ payload }: any): any {
  const { idOrg, idCourse, idLesson, idContent, callback = () => {} } = payload;
  const {
    contentType,
    title,
    description,
    preview = { type: "image" },
    position,
  } = payload.data;

  const data = {
    contentType,
    title,
    description,
    body: `&lt;html&gt;&lt;body&gt;&lt;p&gt;${description}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;`,
    preview: { type: preview.type },
    position,
  };

  try {
    const response = yield call(
      lms_service.updateLessonContent,
      data,
      idOrg,
      idCourse,
      idLesson,
      idContent
    );
    yield put({
      type: TYPES.PUT_UPDATE_LESSON_CONTENT_SUCCESS,
      payload: response,
    });
    const { content, uploadSignedUrl } = response?.data?.data;

    callback({ ...content, uploadSignedUrl });
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.PUT_UPDATE_LESSON_CONTENT_FAILED,
    });
    const { status } = error.response;
    callback(status === 500 ? true : false);
    return Promise.reject(error);
  }
}

export function* postLessonContent({ payload }: any): any {
  const { idOrg, idCourse, idLesson, callback = () => {} } = payload;
  const { contentType, title, description, preview, position } = payload.data;
  const data = {
    contentType,
    title,
    description,
    body: `&lt;html&gt;&lt;body&gt;&lt;p&gt;${description}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;`,
    preview: { type: "video" },
    position,
  };

  try {
    const response = yield call(
      lms_service.postLessonContent,
      data,
      idOrg,
      idCourse,
      idLesson
    );
    yield put({
      type: TYPES.POST_LESSON_CONTENT_SUCCESS,
      payload: response.data,
    });

    const res = response?.data?.data;
    callback(
      "content" in res
        ? { ...res.content, uploadSignedUrl: res.uploadSignedUrl }
        : res
    );
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.POST_LESSON_CONTENT_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* updateTopicContent({ payload }: any): any {
  const {
    idOrg,
    idCourse,
    idLesson,
    idContent,
    idTopic,
    callback = () => {},
  } = payload;
  const { contentType, title, description, position } = payload.data;
  const data = {
    contentType,
    title,
    description,
    body: `&lt;html&gt;&lt;body&gt;&lt;p&gt;${description}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;`,
    position,
  };

  try {
    const response = yield call(
      lms_service.updateTopicContent,
      data,
      idOrg,
      idCourse,
      idLesson,
      idContent,
      idTopic
    );
    yield put({
      type: TYPES.PUT_UPDATE_TOPIC_CONTENT_SUCCESS,
      payload: response,
    });

    callback(response);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.PUT_UPDATE_TOPIC_CONTENT_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* postTopicContent({ payload }: any): any {
  const { idOrg, idCourse, idLesson, idContent, callback = () => {} } = payload;
  const { contentType, title, description, position } = payload.data;
  const data = {
    contentType,
    title,
    description,
    body: `&lt;html&gt;&lt;body&gt;&lt;p&gt;${description}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;`,
    position,
  };

  try {
    const response = yield call(
      lms_service.postTopicContent,
      data,
      idOrg,
      idCourse,
      idLesson,
      idContent
    );
    yield put({
      type: TYPES.POST_TOPIC_CONTENT_SUCCESS,
      payload: response.data,
    });

    callback(response.data);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.POST_TOPIC_CONTENT_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* updateQuizQuestion({ payload }: any): any {
  const {
    idOrg,
    idCourse,
    idLesson,
    idQuiz,
    idQuestion,
    callback = () => {},
  } = payload;
  const {
    contentType,
    questionType,
    title,
    description,
    body,
    resource,
    position,
  } = payload.data;
  const data = {
    contentType,
    questionType,
    title,
    description,
    body:
      questionType === "fill-in-the-blanks"
        ? body
        : `&lt;html&gt;&lt;body&gt;&lt;p&gt;${description}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;`,
    resource,
    position,
  };

  try {
    const response = yield call(
      lms_service.updateQuizQuestion,
      data,
      idOrg,
      idCourse,
      idLesson,
      idQuiz,
      idQuestion
    );
    yield put({
      type: TYPES.PUT_UPDATE_QUIZ_QUESTION_SUCCESS,
      payload: response,
    });

    callback(response);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.PUT_UPDATE_QUIZ_QUESTION_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* postQuizQuestion({ payload }: any): any {
  const { idOrg, idCourse, idLesson, idQuiz, callback = () => {} } = payload;
  const {
    contentType,
    questionType,
    title,
    description,
    body,
    resource,
    position,
  } = payload.data;
  const data = {
    contentType,
    questionType,
    title,
    description,
    body:
      questionType === "fill-in-the-blanks"
        ? body
        : `&lt;html&gt;&lt;body&gt;&lt;p&gt;${description}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;`,
    resource,
    position,
  };

  try {
    const response = yield call(
      lms_service.postQuizQuestion,
      data,
      idOrg,
      idCourse,
      idLesson,
      idQuiz
    );
    yield put({
      type: TYPES.POST_QUIZ_QUESTION_SUCCESS,
      payload: response.data,
    });

    callback(response);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.POST_QUIZ_QUESTION_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export function* postCourseView({ payload }: any): any {
  const { course, user, idOrg, callback = () => {} } = payload;
  const data = {
    course,
    user,
  };

  try {
    const response = yield call(lms_service.postCourseView, data, idOrg);
    yield put({
      type: TYPES.POST_COURSE_VIEW_SUCCESS,
      payload: response.data,
    });

    callback(response);
    return Promise.resolve(response);
  } catch (error) {
    yield put({
      type: TYPES.POST_COURSE_VIEW_FAILED,
    });

    callback(false);
    return Promise.reject(error);
  }
}

export default function* watcher() {
  yield takeLatest(TYPES.PUT_UPDATE_COURSE_REQUEST, updateCourse);
  yield takeLatest(TYPES.POST_COURSE_REQUEST, postCourse);
  yield takeLatest(TYPES.PUT_UPDATE_LESSON_REQUEST, updateLesson);
  yield takeLatest(TYPES.POST_LESSON_REQUEST, postLesson);
  yield takeLatest(
    TYPES.PUT_UPDATE_LESSON_CONTENT_REQUEST,
    updateLessonContent
  );
  yield takeLatest(TYPES.POST_LESSON_CONTENT_REQUEST, postLessonContent);
  yield takeLatest(TYPES.PUT_UPDATE_TOPIC_CONTENT_REQUEST, updateTopicContent);
  yield takeLatest(TYPES.POST_TOPIC_CONTENT_REQUEST, postTopicContent);
  yield takeLatest(TYPES.PUT_UPDATE_QUIZ_QUESTION_REQUEST, updateQuizQuestion);
  yield takeLatest(TYPES.POST_QUIZ_QUESTION_REQUEST, postQuizQuestion);
  yield takeLatest(TYPES.POST_COURSE_VIEW_REQUEST, postCourseView);
}
