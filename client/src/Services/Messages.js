import API from '../api/axios';

class Messages {
  createMessge = async (postData) => {
    return await API.post('/messages', postData);
  };

  fetchMessages = async (id) => {
    return await API.get(`/messages/?query=${id}`);
  };
  getMessagesOfUser = async (id) => {
    return await API.get(`/messages/user?id=${id}`);
  };
}

export default new Messages();
