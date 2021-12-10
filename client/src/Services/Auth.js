import API from '../api/axios';

class Auth {
  Login = async (postData) => {
    return await API.post('/login', { ...postData });
  };

  Registration = (postData) => {
    return API.post('/registration', { ...postData });
  };

  Logout = async () => {
    return await API.post('/logout');
  };
}

export default new Auth();
