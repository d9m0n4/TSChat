const UserDto = require('../DTOS/user-dto');
const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');

class MessagesController {
  constructor(io) {
    this.io = io;
  }

  createMessage = async (req, res) => {
    const postData = {
      user: req.user.id,
      dialog: req.body.dialogId,
      text: req.body.text,
      attachments: req.body.attachments,
    };

    await new Message(postData)
      .save()
      .then((messageObj) =>
        messageObj.populate('dialog user attachments', (err, message) => {
          if (err) {
            res.json('error');
          }
          Dialog.findOneAndUpdate(
            { _id: postData.dialog },
            { lastMessage: messageObj._id },
            { upsert: true },
          ).then(() => {
            this.io.emit('SERVER:DIALOG_CHANGED');
          });
          res.json(message);

          this.io.emit('SERVER:CREATE_MESSAGE', message);
        }),
      )
      .catch((e) => {
        res.json(e);
      });
  };

  getMessages = async (req, res) => {
    const id = req.query.query;

    await Message.find({ dialog: id })
      .populate('attachments')
      .populate('user', ['userAvatar', 'name'])
      .exec((err, messages) => {
        if (err) {
          return res.status(404).json({
            message: 'messages not found',
          });
        }

        // const userDto = new UserDto();
        // // const mappedMessages = messages.map((item) => userDto(item.user));

        // console.log(mappedMessages);
        res.json(messages);
      });
  };

  getMessagesOfUser = async (req, res) => {
    const id = req.query.id;

    try {
      Message.find({ user: id })
        .select(['attachments'])
        .populate('attachments', ['url', 'thumb', 'isAudio'])
        .exec((err, messages) => {
          if (err) {
            console.log(err);
          }
          res.json(messages);
        });
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = MessagesController;
