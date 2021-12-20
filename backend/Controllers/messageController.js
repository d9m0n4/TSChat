const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');

class MessagesController {
  async getMessages(req, res) {
    const id = req.query.dialog;

    await Message.find({ dialog: id })
      .populate(['user', 'dialog'])
      .then((m) => res.json(m));
  }
}

module.exports = MessagesController;
