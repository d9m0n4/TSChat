import API from '../api/axios';

class Users {
  findUsers = async (query) => {
    const { data } = await API.get(`/user/find?query=${query}`);
    return data;
  };
}

export default new Users();
