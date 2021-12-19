import API from '../api/axios';

class Dialogs {
  createDialog = async (payload) => {
    return await API.post('/dialogs', payload);
  };
  fetchDialogs = async () => {
    return await API.get('/dialogs');
  };
}

export default new Dialogs();
