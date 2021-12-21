const socket = require('socket.io');

module.exports = (http) => {
  const io = socket(http, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  io.on('connection', (socket) => {
    console.log('socket connected');
    socket.emit('111', 'привет от сервера');
    socket.on('222', (msg) => {
      console.log(msg);
    });
  });
  io.on('disconnect', (socket) => {
    console.log('socket disconnected');
    socket.emit('123', 'Пользователь отключился');
  });

  return io;
};
