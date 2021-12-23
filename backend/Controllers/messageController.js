const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');

class MessagesController {
  constructor(io) {
    this.io = io;
  }

  createMessage = async (req, res) => {
    const postData = {
      user: req.user.id,
      dialog: req.body.dialog,
      text: req.body.text,
    };

    await new Message(postData)
      .save()
      .then((messageObj) =>
        messageObj.populate('dialog user', (err, message) => {
          if (err) {
            res.json('error');
          }
          Dialog.findByIdAndUpdate({ _id: postData.dialog }, { upsert: true }, (err, dialog) => {
            if (err) {
              return res.status(500).json({
                message: 'ошибка обновления диалога при создании сообщения',
              });
            }
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
    const id = req.query.dialog;

    await Message.find({ dialog: id })
      .populate(['user'])
      .exec((err, messages) => {
        if (err) {
          return res.status(404).json({
            message: 'messages not found',
          });
        }
        res.json(messages);
      });
  };
}

module.exports = MessagesController;
