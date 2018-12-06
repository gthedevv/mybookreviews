import { 
    EDIT_REVIEW_REQUEST, 
    EDIT_REVIEW_SUCCESS,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_ERROR,
    CLEAR_EDIT_BOOK 
} from '../actions/edit-review';

const initialState = {
  book: {},
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === EDIT_REVIEW_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === EDIT_REVIEW_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      book: action.payload
    });
  } else if (action.type === DELETE_REVIEW_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === DELETE_REVIEW_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      book: action.payload
    });
  } else if (action.type === DELETE_REVIEW_ERROR) {
    return Object.assign({}, state, {
        loading: false,
        error: action.error
    });
  } else if (action.type === CLEAR_EDIT_BOOK) {
    return initialState;
  }
  return state;
}