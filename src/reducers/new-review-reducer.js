import { NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS } from '../actions/new-review';

const initialState = {
  book: {},
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === NEW_REVIEW_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === NEW_REVIEW_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      book: action.payload
    });
  }
  return state;
}