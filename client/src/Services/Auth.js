import API from '../api/axios';

class Auth {
  Login = (postData) => {
    return API.post('/login', { ...postData });
  };

  Logout = () => {
    return API.post('/logout');
  };
}

export default new Auth();
