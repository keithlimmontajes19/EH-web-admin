import api from "../index";
import { USERS, REVIEW, ORGANIZATION } from "../constants";
import { lessonId, organizationId } from "ducks/lms/sagas/listSaga";

const auth_services = {
  getMyCourses: (userId: string) => api.get(`${USERS}/${userId}/courses`),
  getListCourses: () => api.get(`courses`),
  getAllCourses: (organizationId: string) =>
    api.get(`${ORGANIZATION}/${organizationId}/courses`),
  getReview: (courseId: string) => api.get(`${REVIEW}/${courseId}/reviews`),

  getLesson: (courseId: string) => api.get(`/courses/${courseId}/lessons`),

  getSingleLesson: (
    organizationId: string,
    courseId: string,
    lessonId: string
  ) =>
    api.get(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}`
    ),
  getLessonDetails: (
    organizationId: string,
    courseId: string,
    lessonId: string
  ) =>
    api.get(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}`
    ),
  getQuizQuestions: (
    organizationId: string,
    courseId: string,
    lessonId: string,
    quizId: string
  ) =>
    api.get(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${quizId}/questions`
    ),
  getTopicDetails: (
    courseId: string,
    lessonId: string,
    contentId: string,
    organizationId: string
  ) =>
    api.get(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${contentId}`
    ),
  getCourse: (courseId: string) => api.get(`/courses/${courseId}`),

  updateCourse: (payload: any, courseId: string) =>
    api.patch(`/courses/${courseId}`, payload),

  postCourse: (payload: any) => api.post(`courses`, payload),
  deleteCourse: (organizationId: string, courseId: string) =>
    api.delete(`${ORGANIZATION}/${organizationId}/courses/${courseId}`),

  updateLesson: (payload: any, lessonId: string) =>
    api.patch(`/lessons/${lessonId}`, payload),

  postLesson: (payload: any) => api.post(`/lessons`, payload),

  deleteLesson: (lessonId: string) => api.delete(`/lessons/${lessonId}`),

  updateLessonContent: (
    payload: any,
    organizationId: string,
    courseId: string,
    lessonId: string,
    contentId: string
  ) =>
    api.put(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${contentId}`,
      payload
    ),
  postLessonContent: (
    payload: any,
    organizationId: string,
    courseId: string,
    lessonId: string
  ) =>
    api.post(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents`,
      payload
    ),
  deleteLessonContent: (
    organizationId: string,
    courseId: string,
    lessonId: string,
    contentId: string
  ) =>
    api.delete(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${contentId}`
    ),
  updateTopicContent: (
    payload: any,
    organizationId: string,
    courseId: string,
    lessonId: string,
    contentId: string,
    topicId: string
  ) =>
    api.put(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${contentId}/contents/${topicId}`,
      payload
    ),
  postTopicContent: (
    payload: any,
    organizationId: string,
    courseId: string,
    lessonId: string,
    contentId: string
  ) =>
    api.post(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${contentId}/contents`,
      payload
    ),
  deleteTopicContent: (
    organizationId: string,
    courseId: string,
    lessonId: string,
    contentId: string,
    topicId: string
  ) =>
    api.delete(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${contentId}/contents/${topicId}`
    ),
  updateQuizQuestion: (
    payload: any,
    organizationId: string,
    courseId: string,
    lessonId: string,
    quizId: string,
    questionId: string
  ) =>
    api.put(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${quizId}/questions/${questionId}`,
      payload
    ),
  postQuizQuestion: (
    payload: any,
    organizationId: string,
    courseId: string,
    lessonId: string,
    quizId: string
  ) =>
    api.post(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${quizId}/questions`,
      payload
    ),
  deleteQuizQuestion: (
    organizationId: string,
    courseId: string,
    lessonId: string,
    quizId: string,
    questionId: string
  ) =>
    api.delete(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${quizId}/questions/${questionId}`
    ),
  postCourseView: (payload: any, organizationId: string) =>
    api.post(
      `${ORGANIZATION}/${organizationId}/course-reports/course-views`,
      payload
    ),
  getCourseView: (organizationId: string) =>
    api.get(`${ORGANIZATION}/${organizationId}/course-reports/course-views`),
  getCourseReportsStats: () => api.get(`course-reports/stats`),
  getAllUserReports: () => api.get(`user-reports`),
  getUserCourseReports: (organizationId: string, userId: string) =>
    api.get(`${ORGANIZATION}/${organizationId}/course-reports/user/${userId}`),
  getUserCourseReportsDetails: (
    organizationId: string,
    userId: string,
    courseId: string
  ) =>
    api.get(
      `${ORGANIZATION}/${organizationId}/course-reports/user/${userId}/course/${courseId}`
    ),
  getUserDetails: (userId: string) => api.get(`${USERS}/${userId}`),
};

export default auth_services;
