import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import course from './courseReducer';
import playerOne from './playerOneReducer';
import playerTwo from './playerTwoReducer';

const store = combineReducers({
  user,
  login,
  course,
  playerOne,
  playerTwo,
});

export default store;
