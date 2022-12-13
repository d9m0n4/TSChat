const socket = require('socket.io');
const User = require('../Models/User');

module.exports = (http) => {
  const io = socket(http, {
    cors: { origin: ['https://tschat94.vercel.app', 'https://tsc-hat-d9m0n4.vercel.app'], credentials: true },
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
        { isOnline: true, lastSeen: Date.now() },
      );
      io.emit('SERVER:SOCKET_ONLINE', { id: doc._id, isOnline: true });
    });

    socket.on('CLIENT_LOGOUT', async () => {
      const oflineUserId = await onlineUsers[socket.id];
      await User.findOneAndUpdate(
        {
          _id: oflineUserId,
        },
        { isOnline: false, lastSeen: Date.now() },
      );
      console.log('disconnected');
      io.emit('SERVER:SOCKET_OFFLINE', {
        id: oflineUserId,
        isOnline: false,
        lastSeen: new Date(Date.now()).toISOString(),
      });
    });

    socket.on('disconnect', async () => {
      const oflineUserId = await onlineUsers[socket.id];
      await User.findOneAndUpdate(
        {
          _id: oflineUserId,
        },
        { isOnline: false, lastSeen: Date.now() },
      );
      console.log('disconnected');
      io.emit('SERVER:SOCKET_OFFLINE', {
        id: oflineUserId,
        isOnline: false,
        lastSeen: new Date(Date.now()).toISOString(),
      });
    });
  });

  return io;
};
