const socket = require('socket.io');
const User = require('../Models/User');

module.exports = (http) => {
  const io = socket(http, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  let users = [];

  io.on('connection', (socket) => {
    console.log('socket connected');

    socket.on('DIALOGS:JOIN', ({ dialogId }) => {
      if (dialogId) {
        socket.join(dialogId);
      }
    });
    socket.on('LEAVE_ROOM', ({ dialogId }) => {
      if (dialogId) {
        socket.leave(dialogId);
        io.to(dialogId).emit('a new user has left the room');
      }
    });

    socket.on('TYPING', (obj) => {
      if (obj) {
        socket.broadcast
          .to(obj.dialogId)
          .emit('USER_TYPING', { dialogId: obj.dialogId, user: obj.user, isTyping: obj.isTyping });
      }
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
