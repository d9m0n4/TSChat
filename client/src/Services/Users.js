import API from '../api/axios';

class Users {
  findUsers = async (query) => {
    return await API.get(`/user/find?query=${query}`);
  };
}

export default new Users();
