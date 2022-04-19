import {TYPES} from './actionTypes';

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
  lessonDetails: {
    data: {},
    loading: false,
  },
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
          data: [],
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

    default:
      return {...state};
  }
};

export default reducer;
