import Messages from '../../Services/Messages';

const messagesActions = {
  setMessages: (payload) => ({
    type: 'MESSAGES:SET_MESSAGES',
    payload,
  }),

  fetchMessages: (payload) => async (dispatch) => {
    try {
      Messages.fetchMessages(payload)
        .then(({ data }) => dispatch(messagesActions.setMessages(data)))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  },
};

export default messagesActions;
