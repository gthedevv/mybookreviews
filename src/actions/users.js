import { SubmissionError } from 'redux-form';

import API_BASE_URL from '../config';
import normalizeResponseErrors from './utils';

const registerUser = user => dispatch =>
  fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
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

export default registerUser;
