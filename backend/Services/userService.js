const User = require('../Models/User');

class userService {
  async activateUser(link) {
    const user = await User.findOne({ activationLink: link });
    console.log(link);
    if (!user) {
      throw new Error('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }
}

module.exports = new userService();
