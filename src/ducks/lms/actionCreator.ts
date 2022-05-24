import { TYPES } from './actionTypes';
import { store } from 'ducks/store';

export const getMyCourses = () =>
  store.dispatch({
    type: TYPES.GET_COURSES_LIST_REQUEST,
  });

export const getAllCourses = () => ({
  type: TYPES.GET_ALL_COURSES_LIST_REQUEST
})

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

export const getLessons = (payload={}) => ({
  type: TYPES.GET_LESSONS_LIST_REQUEST,
  payload
});

export const getSingleLesson = (payload) => ({
  type: TYPES.GET_SINGLE_LESSON_REQUEST,
  payload
})

export const getLessonsDetail = (payload={}) => ({
  type: TYPES.GET_DETAILS_LESSONS_LIST_REQUEST,
  payload
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

export const getCourse = (payload) => ({
  type: TYPES.GET_COURSE_REQUEST,
  payload
});

export const getQuizQuestions = (payload) => ({
  type: TYPES.GET_QUIZ_QUESTIONS_REQUEST,
  payload
})

export const updateCourse = (payload) => ({
  type: TYPES.PUT_UPDATE_COURSE_REQUEST,
  payload,
})

export const postCourse = (payload) => ({
  type: TYPES.POST_COURSE_REQUEST,
  payload
})

export const deleteCourse = (payload) => ({
  type: TYPES.DELETE_COURSE_REQUEST,
  payload
})

export const updateLesson = (payload) => ({
  type: TYPES.PUT_UPDATE_LESSON_REQUEST,
  payload,
})

export const postLesson = (payload) => ({
  type: TYPES.POST_LESSON_REQUEST,
  payload
})

export const deleteLesson = (payload) => ({
  type: TYPES.DELETE_LESSON_REQUEST,
  payload
})

export const updateLessonContent = (payload) => ({
  type: TYPES.PUT_UPDATE_LESSON_CONTENT_REQUEST,
  payload,
})

export const postLessonContent = (payload) => ({
  type: TYPES.POST_LESSON_CONTENT_REQUEST,
  payload
})

export const deleteLessonContent = (payload) => ({
  type: TYPES.DELETE_LESSON_CONTENT_REQUEST,
  payload
})

export const updateTopicContent = (payload) => ({
  type: TYPES.PUT_UPDATE_TOPIC_CONTENT_REQUEST,
  payload,
})

export const postTopicContent = (payload) => ({
  type: TYPES.POST_TOPIC_CONTENT_REQUEST,
  payload
})

export const deleteTopicContent = (payload) => ({
  type: TYPES.DELETE_TOPIC_CONTENT_REQUEST,
  payload
})

export const updateQuizQuestion = (payload) => ({
  type: TYPES.PUT_UPDATE_QUIZ_QUESTION_REQUEST,
  payload
})

export const postQuizQuestion = (payload) => ({
  type: TYPES.POST_QUIZ_QUESTION_REQUEST,
  payload
})

export const deleteQuizQuestion = (payload) => ({
  type: TYPES.DELETE_QUIZ_QUESTION_REQUEST,
  payload
})