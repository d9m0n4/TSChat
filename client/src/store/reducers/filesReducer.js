const initialState = {
  files: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FILES:SET_FILES':
      return {
        ...state,
        files: payload,
      };

    default:
      return state;
  }
};
