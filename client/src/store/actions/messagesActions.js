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

  addMessage: (message) => (dispatch, getState) => {
    const { dialogs } = getState();
    const { currentDialogId } = dialogs;

    console.log(message.dialog._id === currentDialogId);

    if (message.dialog._id === currentDialogId) {
      dispatch({
        type: 'MESSAGES:ADD_MESSAGE',
        payload: message,
      });
    }
  },

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
  sendMessage: (postData) => (dispatch) => {
    return Messages.createMessge(postData);
  },
};

export default messagesActions;
