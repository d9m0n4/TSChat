import openNotification from '../../helpers/notifications/openNotification';
import Auth from '../../Services/Auth';
import socket from '../../api/socket';

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
      const data = await Auth.CheckUser();

      if (data.response && data.response.status == 401) {
        openNotification('error', 'Ошибка', data.response.data.message, 3);
        dispatch(authActions.setAuth(false));
        delete window.localStorage.token;
        return;
      }

      dispatch(authActions.setUser(data.data));
      socket.emit('CLIENT:ONLINE', { userId: data.data.id });
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
    socket.emit('CLIENT_LOGOUT');
  },
  registration: (payload) => async (dispatch) => {
    return await Auth.Registration(payload);
  },
};

export default authActions;
