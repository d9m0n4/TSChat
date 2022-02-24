import API from '../api/axios';

class Conversations {
  createConversation = async (payload) => {
    return await API.post('/conversations', payload);
  };
  getConversations = async () => {
    return await API.get(`/conversations/`);
  };
}

export default new Conversations();
