const initialState = {
  token: window.localStorage.token,
  isAuth: !!window.localStorage.token,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'AUTH:LOGIN':
      return {
        ...state,
        isAuth: payload,
      };

    default:
      return state;
  }
};
