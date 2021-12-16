import API from '../api/axios';

class Users {
  fetchUser = async (query) => {
    API.get(`/user/find?query=${query}`);
  };
}

export default new Users();
