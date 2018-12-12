import { BOOK_REQUEST, BOOK_SUCCESS, BOOK_ERROR, CLEAR_BOOK } from '../actions/book';

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === BOOK_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === BOOK_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      data: action.payload
    });
  } else if (action.type === BOOK_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === CLEAR_BOOK) {
    return initialState;
  }
  return state;
}
