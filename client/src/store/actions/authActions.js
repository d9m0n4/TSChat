import axios from 'axios';
import { BASE_URL } from '../../api/axios';
import Auth from '../../Services/Auth';

const authActions = {
  setAuth: (payload) => ({
    type: 'AUTH:SET_AUTH',
    payload,
  }),

  setUser: (payload) => ({
    type: 'AUTH:SET_USER',
    payload,
  }),

  login: (payload) => (dispatch) => {
    return Auth.Login(payload).then(({ data }) => {
      const token = data.tokens.accessToken;
      if (!data.user.isActivated) {
        return data;
      }
      localStorage.setItem('token', token);
      dispatch(authActions.setAuth(true));
      dispatch(authActions.setUser(data.user));
      return data;
    });
  },

  logout: () => (dispatch) => {
    Auth.Logout();
    dispatch(authActions.setAuth(false));
    dispatch(authActions.setUser({}));
    localStorage.removeItem('token');
  },
};

export default authActions;
