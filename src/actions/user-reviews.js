import API_BASE_URL from '../config';

export const USER_REVIEWS_REQUEST = 'USER_REVIEWS_REQUEST';
export const userReviewsRequest = () => ({
  type: USER_REVIEWS_REQUEST
});

export const USER_REVIEWS_SUCCESS = 'USER_REVIEWS_SUCCESS';
export const userReviewsSuccess = payload => ({
  type: USER_REVIEWS_SUCCESS,
  payload
});

export const USER_REVIEWS_ERROR = 'USER_REVIEWS_ERROR';
export const userReviewsError = error => ({
  type: USER_REVIEWS_ERROR,
  error
});

export const getUserReviews = id => (dispatch, getState) => {
  dispatch(userReviewsRequest());
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}books/user_reviews/${id}`, 
      {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
      }
    )
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
      dispatch(userReviewsSuccess(res));
    })
    .catch(err => {
      dispatch(userReviewsError(err));
    });
};