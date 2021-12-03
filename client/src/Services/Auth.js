import axios from 'axios';
import API, { BASE_URL } from '../api/axios';

class Auth {
  SignIn = (postData) => {
    return API.post('/login', { ...postData });
  };

  Logout = () => {
    return API.post('/logout');
  };

  checkToken = async () => {
    return await axios.get(`${BASE_URL}/refresh`, { withCredentials: true });
  };
}

export default new Auth();
