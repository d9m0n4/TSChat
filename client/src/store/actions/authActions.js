import openNotification from '../../helpers/notifications/openNotification';
import Auth from '../../Services/Auth';
import socket from '../../core/socket';

const authActions = {
  setAuth: (payload) => ({
    type: 'AUTH:SET_AUTH',
    payload,
  }),

  setUser: (payload) => ({
    type: 'AUTH:SET_USER',
    payload,
  }),

  setLoading: (payload) => ({
    type: 'AUTH:SET_LOADING',
    payload,
  }),

  getCurrentUser: () => async (dispatch) => {
    dispatch(authActions.setLoading(true));
    try {
      const userData = await Auth.CheckUser();
      if (userData.response && userData.response.data.status === 401) {
        openNotification('error', 'Ошибка', userData.response.data.message, 3);
        dispatch(authActions.setAuth(false));
        delete window.localStorage.token;
      }
      socket.emit('login', userData.data.id);
      return dispatch(authActions.setUser(userData.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(authActions.setLoading(false));
    }
  },

  login: (payload) => async (dispatch) => {
    dispatch(authActions.setLoading(true));
    try {
      const { data } = await Auth.Login(payload);
      if (!data.user) {
        return openNotification('error', 'Ошибка', 'Неверный email или пароль', 3);
      }
      if (data.user.isActivated) {
        localStorage.setItem('token', data.tokens.accessToken);
        dispatch(authActions.getCurrentUser());
        dispatch(authActions.setAuth(true));
      }
      socket.emit('login', data.user.id);
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(authActions.setLoading(false));
    }
  },

  logout: () => (dispatch) => {
    Auth.Logout();
    dispatch(authActions.setAuth(false));
    dispatch(authActions.setUser({}));
    localStorage.removeItem('token');
    socket.close();
  },
  registration: (payload) => async (dispatch) => {
    return await Auth.Registration(payload);
  },
};

export default authActions;
