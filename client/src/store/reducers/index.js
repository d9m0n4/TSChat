import { combineReducers } from 'redux';
import AuthReducer from '../reducers/authReducer';
import UserReducer from '../reducers/userReducer';
import dialogReducer from './dialogReducer';

export default combineReducers({ auth: AuthReducer, user: UserReducer, dialog: dialogReducer });
