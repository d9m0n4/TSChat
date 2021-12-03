import Auth from '../../Services/Auth';

const authActions = {
  setAuth: (payload) => ({
    type: 'AUTH:LOGIN',
    payload,
  }),
  login: (payload) => (dispatch) => {
    Auth.SignIn(payload).then(({ data }) => {
      const token = data.tokens.accessToken;
      localStorage.setItem('token', token);
      dispatch(authActions.setAuth(true));
    });
  },
  logout: () => (dispatch) => {
    Auth.Logout();
    dispatch(authActions.setAuth(false));
  },
  refreshToken: () => (dispatch) => {
    try {
      Auth.checkToken()
        .then(({ data }) => {
          dispatch(authActions.setAuth(true));
          window.localStorage.setItem('token', data.tokens.accessToken);
          console.log(data);
        })
        .catch(({ response }) => {
          if (response.status === 401) {
            dispatch(authActions.setAuth(false));
            delete window.localStorage.token;
            console.log(response);
          }
        });
    } catch (e) {
      throw new Error();
    }
  },
};

export default authActions;
