import Conversations from "../../Services/Conversations";

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

  fetchConversations: () => async (dispatch) => {
    dispatch(conversationsActions.setLoading(true));
    try {
      const { data } = await Conversations.getConversations()

      if (!data) {
        console.log('error 123');
      }

      return dispatch(conversationsActions.setConversations(data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(conversationsActions.setLoading(false));
    }
  },
};

export default conversationsActions;
