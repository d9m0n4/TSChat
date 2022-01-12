import API from '../api/axios';
import socket from '../core/socket';

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

  CheckUser = async () => {
    return await API.get(`/getCurrentUser`);
  };
}

export default new Auth();
