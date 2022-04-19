const getUnreadMessagesCount = async (id, userId, Model) => {
  const count = await Model.find({
    dialog: id,
    readStatus: false,
    user: { $ne: userId },
  }).count();

  return count;
};

module.exports = getUnreadMessagesCount;
