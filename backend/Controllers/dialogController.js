const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');

class DialogController {
  async createDialog(req, res) {
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

            const message = new Message({
              user: postData.author,
              dialog: dial._id,
              text: postData.text,
            });
            message.save();
            console.log(dial);
          }
        },
      );
    } catch (error) {
      res.json(error);
    }
  }
  async getDialogs(req, res) {
    const { id } = req.user;

    await Dialog.find({ id })
      .then((dialog) => res.json(dialog))
      .catch((err) => res.json(err));
  }
}

module.exports = new DialogController();
