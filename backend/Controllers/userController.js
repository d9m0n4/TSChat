const User = require('../Models/User');
const bcrypt = require('bcrypt');

class UserController {
  async registration(req, res) {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
      res.status(400).json('пользователь с такии email уже существует!');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 3);
    const user = new User({ email: req.body.email, password: hashedPassword });

    await user.save();

    res.status(200).json(user);
  }

  async login(req, res) {}
}

module.exports = new UserController();
