const socket = require('socket.io');
const User = require('../Models/User');

module.exports = (http) => {
  const io = socket(http, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  const users = []

  io.on('connection', (socket) => {
    console.log('socket connected');

    socket.on('userConnected', () => {
      console.log(123123)
    })


    socket.on('disconnect', () => {
      console.log('disconnect')
    })

    socket.on('TYPING', (obj) => {
      socket.broadcast.emit('TYPING', obj)
    })


  });

  return io;
};