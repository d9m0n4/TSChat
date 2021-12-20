const initialState = {
  items: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MESSAGES:SET_MESSAGES':
      return {
        ...state,
        items: payload,
      };

    default:
      return state;
  }
};
