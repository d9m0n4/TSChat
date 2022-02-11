import API from '../api/axios';

class Messages {
  createMessge = async (postData) => {
    return await API.post('/messages', postData);
  };

  fetchMessages = async (id) => {
    return await API.get(`/messages/?query=${id}`);
  };
}

export default new Messages();
