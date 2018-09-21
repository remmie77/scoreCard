import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import course from './courseReducer';

const store = combineReducers({
  user,
  login,
  course,
});

export default store;
