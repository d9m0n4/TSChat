import API from '../api/axios';

class Dialogs {
  FetchDialogs = async () => {
    API.get('/fetchDialogs');
  };
}

export default new Dialogs();
