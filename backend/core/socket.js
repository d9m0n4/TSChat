const socket = require('socket.io');
const User = require('../Models/User');

module.exports = (http) => {
  const io = socket(http, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });
  const user = {};
  io.on('connection', (socket) => {
    console.log('socket connected');

    socket.on('login', async (id) => {
      await User.findOneAndUpdate({ _id: id }, { isOnline: true }, { upsert: true }).then((u) =>
        socket.emit('status', u),
      );
      user[socket.id] = id;
    });

    socket.on('TYPING', (obj) => {
      socket.broadcast.emit('TYPING', obj)
    })

    socket.on('disconnect', async () => {});
  });

  return io;
};
