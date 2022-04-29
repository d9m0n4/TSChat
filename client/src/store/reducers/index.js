import { combineReducers } from 'redux';
import AuthReducer from '../reducers/authReducer';
import dialogReducer from './dialogReducer';
import filesReducer from './filesReducer';
import messagesReducer from './messagesReducer';
import conversationReducer from './conversationReducer';
import rightBar from './rightBar';

export default combineReducers({
  auth: AuthReducer,
  dialogs: dialogReducer,
  conversations: conversationReducer,
  messages: messagesReducer,
  files: filesReducer,
  rightBar: rightBar,
});
