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
  getHistory = async (id, offset) => {
    return await API.get(`/messages/history/?id=${id}&offset=${offset}`);
  };
}

export default new Messages();
