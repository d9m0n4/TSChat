const socket = require('socket.io');
const User = require('../Models/User');

module.exports = (http) => {
  const io = socket(http, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });
  const user = {};
  io.on('connection', (socket) => {
    console.log('socket connected');

    socket.on('userConnected', () => {
      console.log('connected user la la la ')
    })
    socket.on('userDisconnected', () => {
      console.log('dis')
    })

    socket.on('TYPING', (obj) => {
      socket.broadcast.emit('TYPING', obj)
    })


  });

  return io;
};
