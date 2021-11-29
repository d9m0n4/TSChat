import API from '../api/axios';

const SignIn = (email, password) => {
  API.post('/login', { email, password });
};

export default SignIn;
