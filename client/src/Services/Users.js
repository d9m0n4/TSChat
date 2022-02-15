import API from '../api/axios';

class Users {
  findUsers = async (query) => {
    return await API.get(`/user/find?query=${query}`);
  };

  updateUser = async (data) => {
    return await API.patch(`/user`, data);
  };
}

export default new Users();
