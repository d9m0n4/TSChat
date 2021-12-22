const initialState = {
  users: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'USERS:SET_USERS':
      return {
        ...state,
        users: payload,
      };

    default:
      return state;
  }
};
