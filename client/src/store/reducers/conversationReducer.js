const initialState = {
  items: [],
  isLoading: false,
  currentConvId: window.location.pathname.split('/conversation/')[1],
  currentConversation: null,
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
    case 'CONVERSATIONS:SET_CURRENT_CONVERSATION':
      return {
        ...state,
        currentConversation: payload,
      };
    case 'CONVERSATIONS:SET_UNREAD_MESSAGES_COUNT':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === payload.id) {
            item.count = 0;
          }
          return item;
        }),
      };

    default:
      return state;
  }
};
