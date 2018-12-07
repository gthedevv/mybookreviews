import { USER_REVIEWS_REQUEST, USER_REVIEWS_SUCCESS, USER_REVIEWS_ERROR } from '../actions/user-reviews';

const initialState = {
  list: [],
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === USER_REVIEWS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === USER_REVIEWS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      list: action.payload
    });
  } else if (action.type === USER_REVIEWS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}