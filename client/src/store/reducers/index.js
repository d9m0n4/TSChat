import { combineReducers } from 'redux';
import AuthReducer from '../reducers/authReducer';
import UserReducer from '../reducers/userReducer';
import dialogReducer from './dialogReducer';
import filesReducer from './filesReducer';
import messagesReducer from './messagesReducer';

export default combineReducers({
  auth: AuthReducer,
  users: UserReducer,
  dialogs: dialogReducer,
  messages: messagesReducer,
  files: filesReducer,
});
