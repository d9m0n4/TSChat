import io from 'socket.io-client';
const socket = io('tschat-production.up.railway.app/', {
withCredentials: true});

export default socket;
