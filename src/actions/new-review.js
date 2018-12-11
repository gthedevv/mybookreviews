import { SubmissionError } from 'redux-form';

import API_BASE_URL from '../config';
import normalizeResponseErrors from './utils';

export const NEW_REVIEW_REQUEST = 'NEW_REVIEW_REQUEST';
export const newReviewRequest = () => ({
  type: NEW_REVIEW_REQUEST
});

export const NEW_REVIEW_SUCCESS = 'NEW_REVIEW_SUCCESS';
export const newReviewSuccess = payload => ({
  type: NEW_REVIEW_SUCCESS,
  payload
});

const addNewReview = (review, history) => (dispatch, getState) =>{
  dispatch(newReviewRequest());
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/books/book`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(review)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(newReviewSuccess(res))
      console.log(res);
      history.push(`/books/${res.bookId}`)
    })
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
}


export default addNewReview;