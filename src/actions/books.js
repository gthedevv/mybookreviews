import API_BASE_URL from '../config'

export const BOOKS_REQUEST = 'AUTH_REQUEST';
export const bookRequest = () => ({
    type: BOOKS_REQUEST
});

export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const booksSuccess = payload => ({
    type: BOOKS_SUCCESS,
    payload
});

export const BOOKS_ERROR = 'BOOKS_ERROR';
export const booksError = error => ({
    type: BOOKS_ERROR,
    error
});

export const getBooks = (limit, start, order, list) => dispatch => {
  fetch(`${API_BASE_URL}books/?skip=${start}&limit=${limit}&order=${order}`, {
    method: 'GET', 
  })
    .then(res => {
     if(!res.ok){
       return Promise.reject(res.statusText);
     } 
     return res.json();
    })
    .then(data => {
     if (list) {
      dispatch(booksSuccess([...list, ...data]));
     } else {
     dispatch(booksSuccess(data));
     }
    });
}