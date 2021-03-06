const UserDto = require('../DTOS/user-dto');
const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');
const Conversation = require('../Models/Conversation');

class MessagesController {
  constructor(io) {
    this.io = io;
  }

  updateReadStatus = async (dialogId, userId, res) => {
    try {
      await Message.updateMany(
        { dialog: dialogId, user: { $ne: userId } },
        { $set: { readStatus: true } },
      );

      this.io.emit('SERVER:UPDATE_READSTATUS', { userId, dialogId });
    } catch (error) {
      console.log('updateMessagesStatus', error);
    }
  };

  getMessagesCount = async (id) => {
    const count = await Message.find({ dialog: id }).count();
    this.io.emit('MESSAGES_GET_COUNT', count);
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

          this.getMessagesCount(postData.dialog);

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
      .then((messages) => {
        // const userDto = new UserDto();
        // // const mappedMessages = messages.map((item) => userDto(item.user));

        // console.log(mappedMessages);
        this.getMessagesCount(id);
        res.status(200).json(messages);
      })
      .catch((err) => {
        res.status(404).json({
          message: 'messages not found',
          err: err,
          status: 404,
        });
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

  getMessagesHistory = async (req, res) => {
    const id = req.query.id;
    const offset = req.query.offset;
    const user = req.user;

    this.updateReadStatus(id, user.id, res);

    Message.find({ dialog: id })
      .populate('attachments')
      .populate('user', ['userAvatar', 'name'])
      .sort({ createdAt: -1 })
      .skip(Math.floor(offset))
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
        this.getMessagesCount(id);
        res.json(messages);
      });
  };
}

module.exports = MessagesController;
