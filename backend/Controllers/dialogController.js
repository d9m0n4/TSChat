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
          dialog.save().then((dialog) => {
            this.io.emit('DIALOG:CREATED', dialog);
            dialog.populate('members').then((populatedDialog) => res.json(populatedDialog));
            const message = new Message({
              user: req.user.id,
              dialog: dialog._id,
              text: postData.text,
            });
            message.save();
          });
        } else {
          const partners = [];
          dialogs.forEach((dialog) => {
            JSON.parse(JSON.stringify(dialog.members)).forEach((item) => partners.push(item));
          });
          if (partners.includes(req.body.partner)) {
            return res.json({
              status: 403,
              message: 'Такой диалог уже существует',
            });
          }
          const dialog = new Dialog({ members: postData.members });
          dialog.save().then((dialog) => {
            this.io.emit('DIALOG:CREATED', dialog);
            dialog.populate('members').then((populatedDialog) => res.json(populatedDialog));
            const message = new Message({
              user: req.user.id,
              dialog: dialog._id,
              text: postData.text,
            });
            message.save();
          });
        }
      });
    } catch (error) {
      res.json(error);
    }
  };
  getDialogs = async (req, res) => {
    const id = req.user.id;

    Dialog.find({ members: { $in: [id] } })
      .then((dialogs) => {
        if (!dialogs) {
          res.status(404).json({ message: 'диалоги не найдены' });
        }
        const data = [];

        for (const dialog of dialogs) {
          const a = dialog.populate('members').then((popd) => {
            return popd;
          });

          data.push(a);
        }

        return Promise.all(data);
      })
      .then((d) => {
        const partners = [];

        d.forEach((item) => {
          const partner = item.members.find((m) => m._id.toString() !== id);
          partners.push({ dialogId: item._id, partner });
        });

        res.json(partners);
      })
      .catch((err) => res.json(err));
  };
}

module.exports = DialogController;
