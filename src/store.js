import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from 'redux-form';

/* eslint-disable no-underscore-dangle */
export default createStore(
  combineReducers({

  }), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
/* eslint-enable */