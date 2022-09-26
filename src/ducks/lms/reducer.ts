import { TYPES } from './actionTypes';

const INITIAL_STATE = {
  data: [],
  myCourses: [],
  ongoingCourses: [],
  completedCourses: [],
  error: true,
  loading: false,
  curriculum: [],
  curriculumDetails: {},
  reviews: [],
  lesson: {
    data: [],
    loading: false,
  },
  contents: {
    data: {},
    loading: false,
  },
  singleLesson: {
    data: {},
    loading: false,
  },
  lessonDetails: {
    data: {},
    loading: false,
  },
  quizQuestions: {
    data: {},
    loading: false,
  },
  course: {
    data: {},
    loading: false,
  },
  allCourses: {
    data: {},
    loading: false,
  },

  updatedCourse: null,
  postCourse: null,
  deleteCourse: null,

  updatedLesson: null,
  postLesson: null,
  deleteLesson: null,

  updatedLessonContent: null,
  postLessonContent: null,
  deleteLessonContent: null,

  updatedTopicContent: null,
  postTopicContent: null,
  deleteTopicContent: null,

  updatedQuizQuestion: null,
  postQuizQuestion: null,
  deleteQuizQuestion: null,

  topicId: null,
  lessonId: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_COURSES_LIST_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        data: state.data,
        myCourses: state.myCourses,
        ongoingCourses: state.ongoingCourses,
        completedCourses: state.completedCourses,
      };

    case TYPES.GET_COURSES_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: action.payload.data,
        myCourses: action.payload.myCourses,
        ongoingCourses: action.payload.ongoingCourses,
        completedCourses: action.payload.completedCourses,
      };

    case TYPES.GET_COURSES_LIST_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        data: state.data,
        myCourses: state.myCourses,
        ongoingCourses: state.ongoingCourses,
        completedCourses: state.completedCourses,
      };

    case TYPES.GET_COURSES_CURICULUM_SUCCESS:
      return {
        ...state,
        curriculum: action.payload,
      };

    case TYPES.GET_CURICULUM_DETAILS_SUCCESS:
      return {
        ...state,
        curriculumDetails: action.payload,
      };

    /**
     * REDUCER REVIEWS
     * */

    case TYPES.GET_REVIEW_LIST_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
      };

    case TYPES.GET_REVIEW_LIST_FAILED:
      return {
        ...state,
        reviews: [],
      };

    /**
     * LESSON REDUCER
     * */
    case TYPES.GET_LESSONS_LIST_REQUEST:
      return {
        ...state,
        lesson: {
          ...state.lesson,
          loading: true,
        },
      };

    case TYPES.GET_LESSONS_LIST_SUCCESS:
      return {
        ...state,
        lesson: {
          data: action.payload,
          loading: false,
        },
      };

    case TYPES.GET_LESSONS_LIST_FAILED:
      return {
        ...state,
        lesson: {
          data: [],
          loading: false,
        },
      };

    /**
     * SINGLE LESSON REDUCER
     * */
    case TYPES.GET_SINGLE_LESSON_REQUEST:
      return {
        ...state,
        singleLesson: {
          data: [],
          loading: true,
        },
      };

    case TYPES.GET_SINGLE_LESSON_SUCCESS:
      return {
        ...state,
        singleLesson: {
          data: action.payload,
          loading: false,
        },
      };

    case TYPES.GET_SINGLE_LESSON_FAILED:
      return {
        ...state,
        singleLesson: {
          data: [],
          loading: false,
        },
      };

    /**
     * TOPIC DETAILS REDUCER
     * */
    case TYPES.GET_DETAILS_LESSONS_LIST_REQUEST:
      return {
        ...state,
        lessonDetails: {
          data: {},
          loading: true,
        },
      };

    case TYPES.GET_DETAILS_LESSONS_LIST_SUCCESS:
      return {
        ...state,
        lessonDetails: {
          data: action.payload,
          loading: false,
        },
      };

    case TYPES.GET_DETAILS_LESSONS_LIST_FAILED:
      return {
        ...state,
        lessonDetails: {
          data: {},
          loading: false,
        },
      };

    /**
     * QUIZ QUESTIONS REDUCER
     * */
    case TYPES.GET_QUIZ_QUESTIONS_REQUEST:
      return {
        ...state,
        quizQuestions: {
          data: [],
          loading: true,
        },
      };

    case TYPES.GET_QUIZ_QUESTIONS_SUCCESS:
      return {
        ...state,
        quizQuestions: {
          data: action.payload,
          loading: false,
        },
      };

    case TYPES.GET_QUIZ_QUESTIONS_FAILED:
      return {
        ...state,
        quizQuestions: {
          data: [],
          loading: false,
        },
      };

    /**
     * CONTENTS  REDUCER
     * */
    case TYPES.GET_CONTENTS_LIST_REQUEST:
      return {
        ...state,
        contents: {
          data: {},
          loading: true,
        },
      };

    case TYPES.GET_CONTENTS_LIST_SUCCESS:
      return {
        ...state,
        contents: {
          data: action.payload,
          loading: false,
        },
      };

    case TYPES.GET_CONTENTS_LIST_FAILED:
      return {
        ...state,
        contents: {
          data: {},
          loading: false,
        },
      };

    /**
     * TOPIC GET ID  REDUCER
     * */
    case TYPES.ID_GET_TOPIC_SUCCESS:
      return {
        ...state,
        topicId: action.payload,
      };

    /**
     * LESSON GET ID  REDUCER
     * */
    case TYPES.ID_GET_LESSON_SUCCESS:
      return {
        ...state,
        lessonId: action.payload,
      };

    /**
     * COURSE GET ID REDUCER
     * */
    case TYPES.GET_COURSE_REQUEST:
      return {
        ...state,
        course: {
          data: {},
          loading: true,
        },
      };
    case TYPES.GET_COURSE_SUCCESS:
      return {
        ...state,
        course: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.GET_COURSE_FAILED:
      return {
        ...state,
        course: {
          data: {},
          loading: false,
        },
      };

    /**
     * COURSE GET ALL REDUCER
     * */
    case TYPES.GET_ALL_COURSES_LIST_REQUEST:
      return {
        ...state,
        allCourses: {
          data: {},
          loading: true,
        },
      };
    case TYPES.GET_ALL_COURSES_LIST_SUCCESS:
      return {
        ...state,
        allCourses: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.GET_ALL_COURSES_LIST_FAILED:
      return {
        ...state,
        allCourses: {
          data: {},
          loading: false,
        },
      };

    /**
     * COURSE PUT UPDATE REDUCER
     * */
    case TYPES.PUT_UPDATE_COURSE_REQUEST:
      return {
        ...state,
        updatedCourse: {
          data: {},
          loading: true,
        },
      };
    case TYPES.PUT_UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        updatedCourse: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.PUT_UPDATE_COURSE_FAILED:
      return {
        ...state,
        updatedCourse: {
          data: {},
          loading: false,
        },
      };

    /**
     * POST COURSE REDUCER
     * */
    case TYPES.POST_COURSE_REQUEST:
      return {
        ...state,
        postCourse: {
          data: {},
          loading: true,
        },
      };
    case TYPES.POST_COURSE_SUCCESS:
      return {
        ...state,
        postCourse: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.POST_COURSE_FAILED:
      return {
        ...state,
        postCourse: {
          data: {},
          loading: false,
        },
      };

    /**
     * DELETE COURSE REDUCER
     * */
    case TYPES.DELETE_COURSE_REQUEST:
      return {
        ...state,
        deleteCourse: {
          data: {},
          loading: true,
        },
      };
    case TYPES.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        deleteCourse: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.DELETE_COURSE_FAILED:
      return {
        ...state,
        deleteCourse: {
          data: {},
          loading: false,
        },
      };

    /**
     * LESSON PUT UPDATE REDUCER
     * */
    case TYPES.PUT_UPDATE_LESSON_REQUEST:
      return {
        ...state,
        updatedLesson: {
          data: {},
          loading: true,
        },
      };
    case TYPES.PUT_UPDATE_LESSON_SUCCESS:
      return {
        ...state,
        updatedLesson: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.PUT_UPDATE_LESSON_FAILED:
      return {
        ...state,
        updatedLesson: {
          data: {},
          loading: false,
        },
      };

    /**
     * POST LESSON REDUCER
     * */
    case TYPES.POST_LESSON_REQUEST:
      return {
        ...state,
        postLesson: {
          data: {},
          loading: true,
        },
      };
    case TYPES.POST_LESSON_SUCCESS:
      return {
        ...state,
        postLesson: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.POST_LESSON_FAILED:
      return {
        ...state,
        postLesson: {
          data: {},
          loading: false,
        },
      };

    /**
     * DELETE LESSON REDUCER
     * */
    case TYPES.DELETE_LESSON_REQUEST:
      return {
        ...state,
        deleteLesson: {
          data: {},
          loading: true,
        },
      };
    case TYPES.DELETE_LESSON_SUCCESS:
      return {
        ...state,
        deleteLesson: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.DELETE_LESSON_FAILED:
      return {
        ...state,
        deleteLesson: {
          data: {},
          loading: false,
        },
      };

    /**
     * LESSON CONTENT PUT UPDATE REDUCER
     * */
    case TYPES.PUT_UPDATE_LESSON_CONTENT_REQUEST:
      return {
        ...state,
        updatedLessonContent: {
          data: {},
          loading: true,
        },
      };
    case TYPES.PUT_UPDATE_LESSON_CONTENT_SUCCESS:
      return {
        ...state,
        updatedLessonContent: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.PUT_UPDATE_LESSON_CONTENT_FAILED:
      return {
        ...state,
        updatedLessonContent: {
          data: {},
          loading: false,
        },
      };

    /**
     * POST LESSON CONTENT REDUCER
     * */
    case TYPES.POST_LESSON_CONTENT_REQUEST:
      return {
        ...state,
        postLessonContent: {
          data: {},
          loading: true,
        },
      };
    case TYPES.POST_LESSON_CONTENT_SUCCESS:
      return {
        ...state,
        postLessonContent: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.POST_LESSON_CONTENT_FAILED:
      return {
        ...state,
        postLessonContent: {
          data: {},
          loading: false,
        },
      };

    /**
     * DELETE LESSON CONTENT REDUCER
     * */
    case TYPES.DELETE_LESSON_CONTENT_REQUEST:
      return {
        ...state,
        deleteLessonContent: {
          data: {},
          loading: true,
        },
      };
    case TYPES.DELETE_LESSON_CONTENT_SUCCESS:
      return {
        ...state,
        deleteLessonContent: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.DELETE_LESSON_CONTENT_FAILED:
      return {
        ...state,
        deleteLessonContent: {
          data: {},
          loading: false,
        },
      };

    /**
     * TOPIC CONTENT PUT UPDATE REDUCER
     * */
    case TYPES.PUT_UPDATE_TOPIC_CONTENT_REQUEST:
      return {
        ...state,
        updatedTopicContent: {
          data: {},
          loading: true,
        },
      };
    case TYPES.PUT_UPDATE_TOPIC_CONTENT_SUCCESS:
      return {
        ...state,
        updatedTopicContent: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.PUT_UPDATE_TOPIC_CONTENT_FAILED:
      return {
        ...state,
        updatedTopicContent: {
          data: {},
          loading: false,
        },
      };

    /**
     * POST TOPIC CONTENT REDUCER
     * */
    case TYPES.POST_TOPIC_CONTENT_REQUEST:
      return {
        ...state,
        postTopicContent: {
          data: {},
          loading: true,
        },
      };
    case TYPES.POST_TOPIC_CONTENT_SUCCESS:
      return {
        ...state,
        postTopicContent: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.POST_TOPIC_CONTENT_FAILED:
      return {
        ...state,
        postTopicContent: {
          data: {},
          loading: false,
        },
      };

    /**
     * DELETE TOPIC CONTENT REDUCER
     * */
    case TYPES.DELETE_TOPIC_CONTENT_REQUEST:
      return {
        ...state,
        deleteTopicContent: {
          data: {},
          loading: true,
        },
      };
    case TYPES.DELETE_TOPIC_CONTENT_SUCCESS:
      return {
        ...state,
        deleteTopicContent: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.DELETE_TOPIC_CONTENT_FAILED:
      return {
        ...state,
        deleteTopicContent: {
          data: {},
          loading: false,
        },
      };

    /**
     * QUIZ QUESTION PUT UPDATE REDUCER
     * */
    case TYPES.PUT_UPDATE_QUIZ_QUESTION_REQUEST:
      return {
        ...state,
        updatedQuizQuestion: {
          data: {},
          loading: true,
        },
      };
    case TYPES.PUT_UPDATE_QUIZ_QUESTION_SUCCESS:
      return {
        ...state,
        updatedQuizQuestion: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.PUT_UPDATE_QUIZ_QUESTION_FAILED:
      return {
        ...state,
        updatedQuizQuestion: {
          data: {},
          loading: false,
        },
      };

    /**
     * QUIZ QUESTION CONTENT REDUCER
     * */
    case TYPES.POST_QUIZ_QUESTION_REQUEST:
      return {
        ...state,
        postQuizQuestion: {
          data: {},
          loading: true,
        },
      };
    case TYPES.POST_QUIZ_QUESTION_SUCCESS:
      return {
        ...state,
        postQuizQuestion: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.POST_QUIZ_QUESTION_FAILED:
      return {
        ...state,
        postQuizQuestion: {
          data: {},
          loading: false,
        },
      };

    /**
     * DELETE TOPIC CONTENT REDUCER
     * */
    case TYPES.DELETE_QUIZ_QUESTION_REQUEST:
      return {
        ...state,
        deleteQuizQuestion: {
          data: {},
          loading: true,
        },
      };
    case TYPES.DELETE_QUIZ_QUESTION_SUCCESS:
      return {
        ...state,
        deleteQuizQuestion: {
          data: action.payload,
          loading: false,
        },
      };
    case TYPES.DELETE_QUIZ_QUESTION_FAILED:
      return {
        ...state,
        deleteQuizQuestion: {
          data: {},
          loading: false,
        },
      };

    default:
      return { ...state };
  }
};

export default reducer;
