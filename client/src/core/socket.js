import io from 'socket.io-client';
const socket = io('http://localhost:8000');


socket.on('connection', () => {
    socket.emit('login', userData.data.id)
});


export default socket;
