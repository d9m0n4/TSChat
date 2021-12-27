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

      Dialog.find({ members: { $in: [req.user.id] } }).then((dialogs) => {
        if (dialogs.length === 0) {
          const dialog = new Dialog({ members: postData.members });
          dialog.save().then((dialog) => console.log('dialog created', dialog));
        } else {
          dialogs.forEach((dialog) => {
            dialog.populate('members').then((populatedDialog) =>
              populatedDialog.members.forEach((item) => {
                console.log(item._id, req.user.id);
                console.log(Object.is(item._id, req.user.id));
                if (item._id === req.user.id) {
                  console.log('dialog already ', item._id);
                  return res.json('Такой диалог уже существует');
                }
              }),
            );
          });
        }
      });
    } catch (error) {
      res.json(error);
    }
  };
  getDialogs = async (req, res) => {
    const { id } = req.user;

    await Dialog.find().then((dialog) => res.json(dialog));
  };
}

module.exports = DialogController;
