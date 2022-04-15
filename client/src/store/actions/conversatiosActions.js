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
      const { data } = await Conversations.getConversations();

      if (!data) {
        openNotification('error', 'Ошибка', 'Данные не получены', 3);
      }

      return dispatch(conversationsActions.setConversations(data));
    } catch (error) {
      openNotification('error', 'Ошибка', error, 3);
    } finally {
      dispatch(conversationsActions.setLoading(false));
    }
  },
};

export default conversationsActions;
