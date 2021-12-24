const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');

class DialogController {
  constructor(io) {
    this.io = io;
  }

  createDialog = async (req, res) => {
    try {
      const postData = {
        author: req.user.id,
        partner: req.body.partner,
        text: req.body.text,
      };
      await Dialog.findOne({ author: postData.author, partner: postData.partner }).then(
        (dialog) => {
          if (dialog) {
            const message = new Message({
              user: postData.author,
              dialog: dialog._id,
              text: postData.text,
            });
            message.save();
          } else {
            const dial = new Dialog({ author: postData.author, partner: postData.partner });
            dial.save();
            this.io.emit('DIALOG:CREATED', { ...dial });

            const message = new Message({
              user: postData.author,
              dialog: dial._id,
              text: postData.text,
            });
            message.save();
          }
        },
      );
    } catch (error) {
      res.json(error);
    }
  };
  getDialogs = async (req, res) => {
    const { id } = req.user;

    await Dialog.find()
      .or([{ author: id }, { partner: id }])
      .populate(['author', 'partner'])
      .exec((err, dialogs) => {
        if (err) {
          res.json({
            message: 'Dialogs not found',
          });
        }

        return res.json(dialogs);
      });
  };
}

module.exports = DialogController;
