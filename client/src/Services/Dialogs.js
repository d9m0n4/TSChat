import API from '../api/axios';

class Dialogs {
  createDialog = async (payload) => {
    return await API.post('/dialogs', payload);
  };
}

export default new Dialogs();
