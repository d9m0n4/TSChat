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
    case 'MESSAGES:ADD_MESSAGE':
      return {
        ...state,
        items: [...state.items, payload],
      };
    case 'MESSAGES:SET_HISTORY':
      return {
        ...state,
        items: [...payload, ...state.items],
      };
    case 'MESSAGES:UPDATE_READSTATUS':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.user._id !== payload) {
            item.readStatus = true;
          }

          return item;
        }),
      };

    default:
      return state;
  }
};
