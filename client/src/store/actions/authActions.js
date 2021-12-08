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

  login: (payload) => async (dispatch) => {
    try {
      const { data } = await Auth.Login(payload);
      console.log(data);
      // if (!data.user.isActivated) {
      //   return data;
      // }
      // const token = data.tokens.accessToken;
      // localStorage.setItem('token', token);
      // dispatch(authActions.setAuth(true));
      // dispatch(authActions.setUser(data.user));
      // return data;
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
  registration: (payload) => async (dispatch) => {
    await Auth.Registration(payload);
  },
};

export default authActions;
