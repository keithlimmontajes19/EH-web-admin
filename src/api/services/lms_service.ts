import api from '../index';
import {USERS, REVIEW, ORGANIZATION} from '../constants';

const auth_services = {
  getMyCourses: (userId: string) => api.get(`${USERS}/${userId}`),
  getAllCourses: (userId: string) => api.get(`${USERS}/${userId}/courses`),
  getReview: (courseId: string) => api.get(`${REVIEW}/${courseId}/reviews`),
  getLesson: (organizationId: string, courseId: string) =>
    api.get(`${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum`),
  getLessonDetails: (
    organizationId: string,
    courseId: string,
    lessonId: string,
  ) =>
    api.get(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}`,
    ),
  getTopicDetails: (
    courseId: string,
    lessonId: string,
    contentId: string,
    organizationId: string,
  ) =>
    api.get(
      `${ORGANIZATION}/${organizationId}/courses/${courseId}/curriculum/${lessonId}/contents/${contentId}`,
    ),
};

export default auth_services;
