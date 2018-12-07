import { SubmissionError } from 'redux-form';

import API_BASE_URL from '../config';
import normalizeResponseErrors from './utils';

export const EDIT_REVIEW_REQUEST = 'EDIT_REVIEW_REQUEST';
export const editReviewRequest = () => ({
  type: EDIT_REVIEW_REQUEST
});

export const EDIT_REVIEW_SUCCESS = 'EDIT_REVIEW_SUCCESS';
export const editReviewSuccess = payload => ({
  type: EDIT_REVIEW_SUCCESS,
  payload
});

export const CLEAR_EDIT_BOOK = 'CLEAR_EDIT_BOOK';
export const clearEditBook = () => ({
    type: CLEAR_EDIT_BOOK
  });

export const DELETE_REVIEW_REQUEST = 'DELETE_REVIEW_REQUEST';
export const deleteReviewRequest = () => ({
  type: DELETE_REVIEW_REQUEST
});  

export const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS';
export const deleteReviewSuccess = () => ({
    type: DELETE_REVIEW_SUCCESS
  });  

export const DELETE_REVIEW_ERROR = 'DELETE_REVIEW_ERROR';
export const deleteReviewError = () => ({
    type: DELETE_REVIEW_ERROR
  });

export const editReview = (review, history) => (dispatch, getState) =>{
  dispatch(editReviewRequest());
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}books/book/${review.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(review)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(editReviewSuccess(res))
      history.push(`/books/${review.id}`)
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

export const deleteReview = (bookId, history) => (dispatch, getState) =>{
    dispatch(deleteReviewRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}books/book/${bookId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(() => {
      dispatch(deleteReviewSuccess())
      history.push('/user-reviews')
    })
    .catch(err => {
      dispatch(deleteReviewError(err));
    });
}

