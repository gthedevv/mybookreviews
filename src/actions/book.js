import API_BASE_URL from "../config";

export const BOOK_REQUEST = "AUTH_REQUEST";
export const bookRequest = () => ({
  type: BOOK_REQUEST
});

export const BOOK_SUCCESS = "BOOK_SUCCESS";
export const bookSuccess = payload => ({
  type: BOOK_SUCCESS,
  payload
});

export const BOOK_ERROR = "BOOK_ERROR";
export const bookError = error => ({
  type: BOOK_ERROR,
  error
});

export const getBookWithReviewer = id => dispatch => {
  fetch(`${API_BASE_URL}books/book/${id}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      const { reviewerId } = data;
      fetch(`${API_BASE_URL}users/getReviewer/${reviewerId}`)
        .then(res => {
          if (!res.ok) {
            return Promise.reject(res.statusText);
          }
          return res.json();
        })
        .then(user => {
          dispatch(bookSuccess(Object.assign({}, data, user)));
        });
    });
};
