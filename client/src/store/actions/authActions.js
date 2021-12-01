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
};

export default authActions;
