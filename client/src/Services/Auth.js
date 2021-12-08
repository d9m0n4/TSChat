import API from '../api/axios';

class Auth {
  Login = (postData) => {
    return API.post('/login', { ...postData });
  };

  Registration = (postData) => {
    return API.post('/registration', { ...postData });
  };

  Logout = () => {
    return API.post('/logout');
  };
}

export default new Auth();
