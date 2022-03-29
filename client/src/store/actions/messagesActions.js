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

  updateReadStatus: (id) => (dispatch, getState) => {
    const { auth } = getState();
    const { user } = auth;
    if (user.id === id) {
      dispatch({
        type: 'MESSAGES:UPDATE_READSTATUS',
        payload: true,
      });
      console.log(user.id === id);
    }
  },

  addMessage: (message) => (dispatch, getState) => {
    const { dialogs, conversations } = getState();
    const { currentDialogId } = dialogs;
    const { currentConvId } = conversations;

    if (message && message.dialog === (currentDialogId || currentConvId)) {
      dispatch({
        type: 'MESSAGES:ADD_MESSAGE',
        payload: message,
      });
    }
  },

  getMessages: (payload) => async (dispatch) => {
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
    try {
      return Messages.createMessge(postData);
    } catch (error) {
      console.log(error);
    }
  },
};

export default messagesActions;
