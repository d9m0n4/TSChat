import io from 'socket.io-client';
const socket = io('https://tschat-production.up.railway.app', {
withCredentials: true});

export default socket;
