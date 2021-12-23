const initialState = {
  items: [],
  loader: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MESSAGES:SET_MESSAGES':
      return {
        ...state,
        items: payload,
      };
    case 'MESSAGES:SET_LOADER':
      return {
        ...state,
        loader: payload,
      };

    default:
      return state;
  }
};
