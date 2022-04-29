import API from '../api/axios';

class Conversations {
  createConversation = async (payload) => {
    return await API.post('/conversations', payload);
  };
  getConversations = async () => {
    return await API.get(`/conversations/`);
  };
  leaveConversation = async (payload) => {
    return API.post('/conversations/leave', payload);
  };
  updateConversation = async (payload) => {
    return API.post('/conversations/add', payload);
  };
}

export default new Conversations();
