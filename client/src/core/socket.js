import io from 'socket.io-client';
const socket = io('http://localhost:8000');

socket.emit('222', 'привет от клиента');

export default socket;
