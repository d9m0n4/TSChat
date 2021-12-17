class DialogController {
  async createDialog(req, res) {
    try {
      const postData = {
        author: req.user.id,
        partner: req.body.partner,
        text: req.body.text,
      };
      const dialog = await Dialog;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new DialogController();
