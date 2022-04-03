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

  setMessagesHistory: (payload) => ({
    type: 'MESSAGES:SET_HISTORY',
    payload,
  }),

  getMessagesHistory: (id, offset) => async (dispatch) => {
    dispatch(messagesActions.setLoader(true));
    try {
      const { data } = await Messages.getHistory(id, offset);
      dispatch(messagesActions.setMessagesHistory(data.reverse()));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(messagesActions.setLoader(false));
    }
  },

  getMessagesCount: (id) => (dispatch) => {
    dispatch({
      type: 'MESSAGES:GET_UNREAD_COUNT',
      payload: id,
    });
  },

  updateReadStatus: (id) => (dispatch, getState) => {
    dispatch({
      type: 'MESSAGES:UPDATE_READSTATUS',
      payload: id,
    });
  },

  addMessage: (message) => (dispatch, getState) => {
    const { dialogs, conversations, auth } = getState();
    const { currentDialogId } = dialogs;
    const { currentConvId } = conversations;
    const { user } = auth;

    let currentMessage = message;

    if (message.user._id !== user.id) {
      currentMessage = { ...message, readStatus: true };
    }

    if (message && message.dialog === (currentDialogId || currentConvId)) {
      dispatch({
        type: 'MESSAGES:ADD_MESSAGE',
        payload: currentMessage,
      });
    }
  },

  getMessages: (payload) => async (dispatch) => {
    dispatch(messagesActions.setLoader(true));
    try {
      const { data } = await Messages.fetchMessages(payload);
      dispatch(messagesActions.setMessages(data.reverse()));
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
