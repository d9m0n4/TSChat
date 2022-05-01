import openNotification from '../../helpers/notifications/openNotification';
import Conversations from '../../Services/Conversations';

const conversationsActions = {
  setConversations: (payload) => ({
    type: 'CONVERSATIONS:SET_CONVERSATIONS',
    payload,
  }),
  setLoading: (payload) => ({
    type: 'CONVERSATIONS:SET_LOADING',
    payload,
  }),
  setMessagesCount: (payload) => ({
    type: 'CONVERSATIONS:SET_UNREAD_MESSAGES_COUNT',
    payload,
  }),
  setConversationAfterLeaving: (payload) => ({
    type: 'UPDATE_CONVERSATION_AFTER_LEAVING',
    payload,
  }),

  leaveConversation: (obj) => async (dispatch) => {
    try {
      const { data } = await Conversations.leaveConversation(obj);

      if (data) {
        openNotification('warning', 'Внимание!', data.message);
      } else {
        console.log(123123123123123123123123123123);
      }

      dispatch(conversationsActions.setConversationAfterLeaving(data));
    } catch (error) {
      openNotification('info', 'error', 'error');
      console.log(error);
    }
  },

  updateConvUnreadMessagesCount: (obj) => (dispatch) => {
    dispatch(conversationsActions.setMessagesCount(obj));
  },

  setCurrentConversationId: (id) => (dispatch) => {
    dispatch({
      type: 'CONVERSATIONS:SET_CURRENT_CONVERSATION_ID',
      payload: id,
    });
  },

  setCurrentConversation: (currentConversation) => (dispatch) => {
    dispatch({
      type: 'CONVERSATIONS:SET_CURRENT_CONVERSATION',
      payload: currentConversation,
    });
  },

  fetchConversations: () => async (dispatch) => {
    dispatch(conversationsActions.setLoading(true));
    try {
      const data = await Conversations.getConversations();
      if (!data) {
        openNotification('error', 'Ошибка', 'Данные не получены', 3);
      }

      return dispatch(conversationsActions.setConversations(data.data));
    } catch (error) {
      openNotification('error', 'Ошибка', error, 3);
    } finally {
      dispatch(conversationsActions.setLoading(false));
    }
  },
};

export default conversationsActions;
