const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');

class DialogController {
  constructor(io) {
    this.io = io;
  }

  createDialog = async (req, res) => {
    try {
      const postData = {
        members: [req.user.id, req.body.partner],
        text: req.body.text,
      };

      await Dialog.find({ members: { $in: [req.user.id] } }).exec((err, dialog) => {
        if (err) {
          console.log('err', err);
        }
        if (dialog) {
          console.log(dialog);
          return res.status(500).json('ТАкой диалог уже есть');
        }
        const dialogObj = new Dialog({ members: postData.members });
        dialogObj
          .save()
          .then((dialog) => {
            const message = new Message({
              user: req.user.id,
              dialog: dialog._id,
              text: postData.text,
            });
            message.save();
          })
          .catch((err) => res.status(500).json(err));
        res.json(dialogObj);
      });
    } catch (error) {
      res.json(error);
    }
  };
  getDialogs = async (req, res) => {
    const { id } = req.user;

    await Dialog.find()
      .populate({
        path: 'members',
        match: {},
      })
      .then((dialog) => console.log(dialog));
  };
}

module.exports = DialogController;
