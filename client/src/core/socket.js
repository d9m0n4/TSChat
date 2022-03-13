import io from 'socket.io-client';
const socket = io('http://localhost:8000');

const userConnected = () => {
    socket.emit('userConnected')
}

const userDisconnected = () => {
    socket.emit('userDisconnected')
}

if (socket.connected) {
    socket.emit('userConnected')
}

if (socket.disconnect) {
    socket.emit('userDisconnected')
}



export default socket;
