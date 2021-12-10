const initialState = {
  token: window.localStorage.token,
  isAuth: !!window.localStorage.token,
  user: {},
  errors: {
    message: '',
    description: '',
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'AUTH:SET_AUTH':
      return {
        ...state,
        isAuth: payload,
      };
    case 'AUTH:SET_USER':
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};
