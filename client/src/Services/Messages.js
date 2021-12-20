import API from '../api/axios';

class Messages {
  fetchMessages = async (id) => {
    return await API.get('/messages?dialog=' + id);
  };
}

export default new Messages();
