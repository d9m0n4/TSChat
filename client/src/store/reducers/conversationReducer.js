const initialState = {
  items: [],
  isLoading: false,
  currentConvId: window.location.pathname.split('/conversation/')[1],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CONVERSATIONS:SET_CONVERSATIONS':
      return {
        ...state,
        items: payload,
      };

    case 'CONVERSATIONS:SET_CURRENT_CONVERSATION_ID':
      return {
        ...state,
        currentConvId: payload,
      };
    case 'CONVERSATIONS:SET_LOADING':
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
};
