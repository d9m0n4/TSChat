import io from 'socket.io-client';
const socket = io('http://localhost:8000');


socket.on('connection', () => {
    socket.emit('userConnected')
})

if (socket.disconnect) {
    socket.emit('userDisconnected')
}



export default socket;
