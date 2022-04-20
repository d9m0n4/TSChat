const socket = require('socket.io');
const User = require('../Models/User');

module.exports = (http) => {
  const io = socket(http, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  const onlineUsers = {};

  io.on('connection', (socket) => {
    console.log('socket connected');

    //Typing message block start//
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
    //Typing message block end//

    socket.on('CLIENT:ONLINE', async (data) => {
      onlineUsers[socket.id] = data.userId;
      const doc = await User.findOneAndUpdate(
        {
          _id: data.userId,
        },
        { isOnline: true },
      );
      socket.emit('SERVER:SOCKET_ONLINE', { id: doc._id });
    });

    socket.on('disconnect', async () => {
      const oflineUserId = await onlineUsers[socket.id];
      console.log(oflineUserId);
    });
  });

  return io;
};
