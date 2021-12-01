import API from '../api/axios';

class Auth {
  SignIn = (postData) => {
    return API.post('/login', { ...postData });
  };

  Logout = () => {
    return API.post('/logout');
  };

  checkToken = () => {
    return API.get('/refresh');
  };
}

export default new Auth();
