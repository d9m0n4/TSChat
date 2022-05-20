import io from 'socket.io-client';
const socket = io('https://shielded-sands-09042.herokuapp.com/', {
withCredentials: true});

export default socket;
