const socket = require('socket.io');

module.exports = (http) => {
  const io = socket(http, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  io.on('connection', (socket) => {
    console.log('socket connected');
  });
  io.on('disconnect', (socket) => {
    console.log('socket disconnected');
  });

  return io;
};
