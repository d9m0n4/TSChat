const Conversation = require('../Models/Conversation');
const Message = require('../Models/Message');
const User = require('../Models/User');

const UserDto = require('../DTOS/user-dto');
const getUnreadMessagesCount = require('../utils/getUnreadMessagesCount');

class ConversationController {
  constructor(io) {
    this.io = io;
  }

  getmessagesCount = getUnreadMessagesCount;

  createConversation = async (req, res) => {
    const currentUser = req.user.id;
    const { members, title } = req.body;

    Conversation.find({ creator: currentUser, title: req.body.title }).then((conv) => {
      if (conv.length) {
        return res.status(200).json({
          message: 'Такая беседа уже существует',
        });
      } else {
        User.findOne({ _id: currentUser }).then((user) => {
          const conversation = new Conversation({
            creator: currentUser,
            members: [...members, currentUser],
            title,
          });
          conversation.save().then((conv) => {
            const message = new Message({
              user: currentUser,
              dialog: conv._id,
              text: `Пользователь ${user.name}   ${
                user.nickName ? user.nickName : ''
              } создал беседу ${title}`,
              server: true,
            });

            message.save().then((m) => {
              conv.lastMessage = m._id;
              conv.save();
              this.io.emit('CONVERSATION_SET_ITEM', conv);
            });

            res.status(200);
          });
        });
      }
    });
  };

  getConversations = async (req, res) => {
    const user = req.user.id;
    try {
      const userConversations = await Conversation.find({ members: { $in: [user] } })
        .populate(['creator', 'members'])
        .populate({
          path: 'lastMessage',
          populate: {
            path: 'user',
          },
        });
      const data = [];

      for (const item of userConversations) {
        const count = await this.getmessagesCount(item._id, user, Message);
        const userDto = new UserDto(item.creator);
        const convMembers = item.members.map((item) => new UserDto(item));
        data.push({
          count,
          id: item._id,
          title: item.title,
          creator: userDto,
          members: convMembers,
          lastMessage: item.lastMessage,
        });
      }

      res.status(200).json(data);
    } catch (error) {
      res.json({
        message: 'Messages not found',
        status: 500,
      });
    }
  };

  leaveConversation = async (req, res) => {
    const currentUser = req.user.id;
    const leavingUser = req.body.user;
    const currentConv = req.body.convId;

    if (!req.body) {
      res.status(404).json({
        message: 'not found',
        status: 404,
      });
    }

    try {
      Conversation.findById(currentConv)
        .populate(['creator', 'members'])
        .populate({
          path: 'lastMessage',
          populate: {
            path: 'user',
          },
        })
        .then((conversation) => {
          try {
            const creatorId = conversation.creator._id.toString();

            const creatorDto = new UserDto(conversation.creator);
            const leftUser = conversation.members.find(
              (item) => item._id.toString() === leavingUser,
            );
            if (creatorId === currentUser && creatorId !== leavingUser) {
              conversation.members.pull({ _id: leavingUser });

              conversation.save().then((conv) => {
                const message = new Message({
                  user: creatorDto.id,
                  dialog: conv._id,
                  text: `Пользователь ${leftUser ? leftUser.name : ''}
               исключен из беседы`,
                  server: true,
                });

                message.save().then((m) => {
                  conv.lastMessage = m._id;
                  conv.save();
                  this.io.emit('SERVER:CONV_CHANGED', conv);
                });
                this.io.emit('SERVER:CREATE_MESSAGE', message);
                res.status(200).json({
                  message: 'Пользователь исключен из беседы',
                  status: 200,
                });
              });
            }
            if (creatorId === leavingUser) {
              const remainingMembers = conversation.members.filter(
                (item) => item._id.toString() !== creatorId,
              );
              if (remainingMembers.length) {
                res.status(200).json({
                  message: 'Вы не можете покинуть беседу, пока в ней есть другие участники!',
                  status: 200,
                });
              } else {
                // conversation.members.pull({ _id: leavingUser });
                // conversation.save();
                conversation.remove();
                Message.deleteMany({ dialog: currentConv }, (err) => {
                  res.json(err);
                });
                this.io.emit('SERVER:CONV_CHANGED', null);
              }
            }
            if (currentUser !== creatorId && leavingUser !== creatorId) {
              console.log(currentUser !== creatorId, leavingUser !== creatorId);
              conversation.members.pull({ _id: leavingUser });
              conversation.save().then((conv) => {
                const message = new Message({
                  user: creatorDto.id,
                  dialog: conv._id,
                  text: `Пользователь ${leftUser ? leftUser.name : ''}
               покинул беседу.`,
                  server: true,
                });

                message.save().then((m) => {
                  conv.lastMessage = m._id;
                  conv.save();
                  this.io.emit('SERVER:CONV_CHANGED', conv);
                });
                this.io.emit('SERVER:CREATE_MESSAGE', message);
                res.status(200).json({
                  message: 'Вы покинули беседу',
                });
              });
            }
            res.status(200);
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: error,
              status: 500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      res.status(200);
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  };
  addUsersToConversation = async (req, res) => {
    const currentConv = req.body.id;
    const convMembers = req.body.users;
    const currentUser = req.user;

    try {
      const conversation = await Conversation.findById(currentConv);
      if (conversation.creator._id.toString() === currentUser.id) {
        if (!convMembers) {
          return res.json({
            message: 'not FOUND',
          });
        }
        conversation.members.push({ $each: convMembers });

        conversation.save().then((conv) => {
          const message = new Message({
            user: currentUser.id,
            dialog: conv._id,
            text: `Пользователь 
         присоединился к беседе`,
            server: true,
          });

          message.save().then((m) => {
            conv.lastMessage = m._id;
            conv.save();
            this.io.emit('SERVER:CONV_CHANGED', conv);
          });
          this.io.emit('SERVER:CREATE_MESSAGE', message);
          res.status(200);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ConversationController;
