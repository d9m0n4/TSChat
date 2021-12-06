import axios from 'axios';
import { BASE_URL } from '../../api/axios';
import Auth from '../../Services/Auth';

const authActions = {
  setAuth: (payload) => ({
    type: 'AUTH:CHECKAUTH',
    payload,
  }),
  setUser: (payload) => ({
    type: 'AUTH:SET_USER',
    payload,
  }),
  login: (payload) => (dispatch) => {
    try {
      Auth.Login(payload).then(({ data }) => {
        console.log(data);
        const token = data.tokens.accessToken;
        localStorage.setItem('token', token);
        dispatch(authActions.setAuth(true));
        dispatch(authActions.setUser(data.user));
      });
    } catch (error) {
      console.log(error);
    }
  },
  logout: () => (dispatch) => {
    Auth.Logout();
    dispatch(authActions.setAuth(false));
    dispatch(authActions.setUser({}));
    localStorage.removeItem('token');
  },
};

export default authActions;
