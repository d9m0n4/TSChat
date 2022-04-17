const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');

class DialogController {
  constructor(io) {
    this.io = io;
  }

  getUnreadMessagesCount = async (id, userId) => {
    const count = await Message.find({
      dialog: id,
      readStatus: false,
      user: { $ne: userId },
    }).count();
    this.io.emit('SERVER:UNREAD_MESSAGES_COUNT', count);
    return count;
  };

  createDialog = async (req, res) => {
    try {
      const postData = {
        members: [req.user.id, req.body.partner],
        text: req.body.text,
      };

      Dialog.find({ members: { $in: [req.user.id] } }).then((dialogs) => {
        if (dialogs.length === 0) {
          const dialog = new Dialog({ members: postData.members });
          dialog.save().then((d) => {
            const message = new Message({
              user: req.user.id,
              dialog: d._id,
              text: postData.text,
            });
            message.save().then((m) => {
              d.lastMessage = m._id;
              d.save().then((dlg) => {
                dlg.populate('members lastMessage').then((d) => {
                  this.io.emit('DIALOG:CREATED', d);
                });
              });
            });
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
            const message = new Message({
              user: req.user.id,
              dialog: dialog._id,
              text: postData.text,
            });
            message.save().then((m) => {
              dialog.lastMessage = m._id;
              dialog.save().then((d) =>
                d.populate('members lastMessage').then((populatedDialog) => {
                  this.io.emit('DIALOG:CREATED', populatedDialog);
                }),
              );
            });
          });
        }
      });
    } catch (error) {
      res.json(error);
    }
  };
  getDialogs = async (req, res) => {
    const id = req.user.id;

    try {
      const dialogs = await Dialog.find({ members: { $in: [id] } }).populate('members lastMessage');

      const data = [];

      for (const item of dialogs) {
        const unreadMessagesCount = await this.getUnreadMessagesCount(item._id, id);
        const partner = item.members.find((m) => m._id.toString() !== id);

        data.push({
          count: unreadMessagesCount,
          partner,
          lastMessage: item.lastMessage,
          dialogId: item._id,
        });
      }
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = DialogController;
