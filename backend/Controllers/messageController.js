const UserDto = require('../DTOS/user-dto');
const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');
const Conversation = require('../Models/Conversation');

class MessagesController {
  constructor(io) {
    this.io = io;
  }

  updateReadStatus = (dialogId, userId, res) => {
    Message.updateMany({ dialog: dialogId, user: { $ne: userId } }, { $set: { readStatus: true } })
      .then(() => this.io.emit('SERVER:UPDATE_READSTATUS', userId))
      .catch((err) => console.log('err', err));
  };

  createMessage = async (req, res) => {
    const postData = {
      user: req.user.id,
      dialog: req.body.dialogId,
      text: req.body.text,
      attachments: req.body.attachments,
    };

    const message = new Message(postData);

    this.updateReadStatus(postData.dialog, postData.user, res);

    message
      .save()
      .then((messageObj) => {
        messageObj.populate('user attachments', (err, message) => {
          if (err) {
            res.json('error');
          }

          Dialog.findOneAndUpdate({ _id: postData.dialog }, { lastMessage: messageObj._id }).then(
            (dialog) => {
              if (!dialog) {
                Conversation.findOneAndUpdate(
                  { _id: postData.dialog },
                  { lastMessage: messageObj._id },
                ).then((conv) => {
                  this.io.emit('SERVER:CONV_CHANGED', conv);
                });
              } else {
                this.io.emit('SERVER:DIALOG_CHANGED', dialog);
              }
            },
          );

          res.status(200).json(message);

          this.io.emit('SERVER:CREATE_MESSAGE', message);
        });
      })
      .catch((e) => {
        res.json(e);
      });
  };

  getMessages = async (req, res) => {
    const id = req.query.query;
    const user = req.user;

    this.updateReadStatus(id, user.id, res);

    Message.find({ dialog: id })
      .populate('attachments')
      .populate('user', ['userAvatar', 'name'])
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
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
