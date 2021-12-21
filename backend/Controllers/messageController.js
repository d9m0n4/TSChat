const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');

class MessagesController {
  async getMessages(req, res) {
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
  }
}

module.exports = MessagesController;
