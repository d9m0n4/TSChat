const socket = require('socket.io');

const createSocket = (http) => {
  const io = socket(http, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  io.on('connection', (socket) => {
    console.log('soket connected');
    socket.emit('111', 'привет от сервера');
    socket.on('222', (msg) => {
      console.log(msg);
    });
  });

  return io;
};

module.exports = createSocket;
