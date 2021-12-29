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
          dialogs.forEach((dialog) => {
            console.log(dialogs);
          });
          //   if (dialog.members.includes(req.user.id)) {
          //     return res.json({
          //       message: 'Такой диалог уже существует',
          //     });
          //   }
          //   const dialogObj = new Dialog({ members: postData.members });
          //   dialogObj.save().then((dialog) => {
          //     this.io.emit('DIALOG:CREATED', dialog);
          //     dialog.populate('members').then((populatedDialog) => res.json(populatedDialog));
          //     const message = new Message({
          //       user: req.user.id,
          //       dialog: dialog._id,
          //       text: postData.text,
          //     });
          //     message.save();
          //   });

          //   // dialog.populate('members').then((populatedDialog) => {
          //   //   const popm = populatedDialog.members;
          //   // });
          // }
          // );
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
      .then((d) => res.json(d))
      .catch((err) => res.json(err));
  };
}

module.exports = DialogController;
