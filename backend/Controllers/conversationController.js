const Conversation = require('../Models/Conversation');
const Message = require('../Models/Message');

const UserDto = require('../DTOS/user-dto');

class ConversationController {
  constructor(io) {
    this.io = io;
  }

  createConversation = async (req, res) => {
    const currentUser = req.user.id;
    const { members, title } = req.body;

    Conversation.find({ creator: currentUser, title: req.body.title }).then((conv) => {
      if (conv.length) {
        return console.log(conv, 'уже существует');
      } else {
        const conversation = new Conversation({
          creator: currentUser,
          members: [...members, currentUser],
          title,
        });
        conversation.save().then((conv) => {
          this.io.emit('CONVERSATION_SET_ITEM', conv);
          res.status(200);
        });
      }
    });
  };

  getConversations = async (req, res) => {
    const user = req.user.id;
    await Conversation.find({ members: { $in: [user] } })
      .populate(['creator', 'members'])
      .then((userConversations) => {
        const userConv = userConversations.map((item) => {
          const userDto = new UserDto(item.creator);
          const convMembers = item.members.map((item) => new UserDto(item));

          return {
            id: item._id,
            title: item.title,
            creator: userDto,
            members: convMembers,
          };
        });
        res.status(200).json(userConv);
      })
      .catch((e) => {
        res.json(e);
      });
  };
}

module.exports = ConversationController;
