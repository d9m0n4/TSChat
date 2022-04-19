const getUnreadMessagesCount = async (id, userId) => {
  const count = await Message.find({
    dialog: id,
    readStatus: false,
    user: { $ne: userId },
  }).count();
  this.io.emit('SERVER:UNREAD_MESSAGES_COUNT', count);
  console.log(count);
  return count;
};

module.exports = getUnreadMessagesCount;
