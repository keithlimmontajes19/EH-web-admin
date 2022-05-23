import { TYPES } from './actionTypes';
import { store } from 'ducks/store';

export const getMyCourses = () =>
  store.dispatch({
    type: TYPES.GET_COURSES_LIST_REQUEST,
  });

export const getCurriculum = (payload) => ({
  type: TYPES.GET_COURSES_CURICULUM_REQUEST,
  payload,
});

export const getCurriculumDetails = (payload) => ({
  type: TYPES.GET_CURICULUM_DETAILS_REQUEST,
  payload,
});

export const getReviews = (payload) => ({
  type: TYPES.GET_REVIEW_LIST_REQUEST,
  payload,
});

export const getLessons = () => ({
  type: TYPES.GET_LESSONS_LIST_REQUEST,
});

export const getLessonsDetail = () => ({
  type: TYPES.GET_DETAILS_LESSONS_LIST_REQUEST,
});

export const getContents = (payload) => ({
  type: TYPES.GET_CONTENTS_LIST_REQUEST,
  payload,
});

export const getTopicID = (payload) => ({
  type: TYPES.ID_GET_TOPIC_REQUEST,
  payload,
});

export const getLessonId = (payload) => ({
  type: TYPES.ID_GET_LESSON_REQUEST,
  payload,
});
