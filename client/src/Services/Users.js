import API from '../api/axios';

class Users {
  findUsers = async (query) => {
    return await API.get(`/user/find?query=${query}`);
  };

  updateUser = async (data) => {
    return await API.patch(`/user`, data);
  };
  updateConvUsers = async (obj) => {
    return await API.post(`/users/conv/`, obj);
  };
}

export default new Users();
