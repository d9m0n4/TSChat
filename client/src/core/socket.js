import io from 'socket.io-client';
const socket = io('http://localhost:8000');

socket.emit('222', 'привет от клиента');

socket.on('111', (msg) => {
  console.log(msg);
});

socket.on('333', (msg) => {
  console.log(msg);
});
export default socket;
