import { BOOKS_REQUEST, BOOKS_SUCCESS, BOOKS_ERROR } from '../actions/books';

const initialState = {
  list: null,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === BOOKS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === BOOKS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      list: action.payload
    });
  } else if (action.type === BOOKS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}
