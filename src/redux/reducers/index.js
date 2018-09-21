import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import course from './courseReducer';
import playerOne from './playerOneReducer';

const store = combineReducers({
  user,
  login,
  course,
  playerOne,
});

export default store;
