const initialState = {
  active: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'RIGHTBAR:SET_ACTIVE':
      return {
        ...state,
        active: payload,
      };

    default:
      return state;
  }
};
