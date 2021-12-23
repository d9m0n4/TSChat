import Messages from '../../Services/Messages';

const messagesActions = {
  setMessages: (payload) => ({
    type: 'MESSAGES:SET_MESSAGES',
    payload,
  }),
  setLoader: (payload) => ({
    type: 'MESSAGES:SET_LOADER',
    payload,
  }),

  fetchMessages: (payload) => async (dispatch) => {
    dispatch(messagesActions.setLoader(true));
    try {
      const { data } = await Messages.fetchMessages(payload);
      dispatch(messagesActions.setMessages(data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(messagesActions.setLoader(false));
    }
  },
};

export default messagesActions;
