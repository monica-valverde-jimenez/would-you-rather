import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import users from './users';
import questions from './questions';
import authUser from './authUser'

export default combineReducers({
  authUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
});