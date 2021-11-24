const User = require('../Models/User');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../Services/mail-service');

class UserController {
  async registration(req, res) {
    const { email, password } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      res.status(400).json('пользователь с такии email уже существует!');
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await User.create({
      email,
      password: hashedPassword,
      activationLink,
    });
    await mailService.sendActivationLink(
      email,
      `http://localhost:8000/api/activate/${activationLink}`,
    );
    await user.save();

    res.status(200).json(user);
  }

  async activateAccaunt(req, res) {
    const user = await User.findOne({ activationLink: req.params.link });
    if (!user) {
      throw new Error('Некорректная ссылка');
    }
    user.isActivated = true;

    await user.save();

    res.redirect('http://ya.ru/');
  }

  async login(req, res) {}
}

module.exports = new UserController();
