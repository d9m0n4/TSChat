const socket = require('socket.io');
const User = require('../Models/User');

module.exports = (http) => {
  const io = socket(http, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  let users = [];

  io.on('connection', (socket) => {
    console.log('socket connected');

    socket.on('DIALOGS:SET_DIALOG_ID', (id) => {
      socket.join(id);
      socket.broadcast.to(id).emit('JOINED', id);
      socket.on('TYPING', (obj) => {
        socket.broadcast.to(id).emit('T', obj);
      });
    });

    // socket.on('TYPING', (obj) => {

    // });

    socket.on('user:add', (user) => {
      users.push(user.id);
      console.log(users);
    });

    socket.on('dis', (obj) => {
      users = users.filter((item) => {
        item !== obj;
      });
      console.log(users);
      console.log('diididididididid');
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    socket.on('TYPING', (obj) => {
      socket.broadcast.emit('TYPING', obj);
    });
  });

  return io;
};
