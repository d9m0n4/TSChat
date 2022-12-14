const User = require('../Models/User');
const SendMail = require('../Services/mail-service');
const TokenService = require('../Services/token-service');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserDto = require('../DTOS/user-dto');
const { validationResult } = require('express-validator');
const { default: userService } = require('../Services/userService');
require('dotenv').config();

class UserController {
  constructor(io) {
    this.io = io;
  }
  async registration(req, res) {
    try {
      const { email, name, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.json('ошибка при валидации');
        res.json(errors);
      }

      const candidate = await User.findOne({ email });

      if (candidate) {
        res.status(409).json({
          message: 'Пользователь с таким email уже существует',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 3);
      const activationStr = uuid.v4();

      const user = await User.create({
        email,
        name,
        password: hashedPassword,
        activationLink: activationStr,
      });
      const userDTO = new UserDto(user);

      await SendMail.sendActivationLink(email, activationStr);

      const tokens = TokenService.generateTokens({ ...userDTO });

      await TokenService.saveToken(userDTO.id, tokens.refreshToken);

      await user.save();

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const userData = { tokens, user: userDTO };
      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
    }
  }
  async activationAccaunt(req, res) {
    try {
      const link = req.params.activationLink;
      await userService.activateUser(link);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
  login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Неверное имя пользователя или пароль', status: 403 });
    }

    const identPass = await bcrypt.compare(password, user.password);
    if (!identPass) {
      return res.json({ message: 'Неверное имя пользователя или пароль', status: 403 });
    }

    const userDTO = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDTO });

    await TokenService.saveToken(userDTO.id, tokens.refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const userData = { tokens, user: userDTO };

    res.status(200).json(userData);
  };
  logout = async (req, res) => {
    const { refreshToken } = req.cookies;
    const token = await TokenService.deleteToken(refreshToken);
    res.clearCookie('refreshToken');
    res.json(token);
  };
  async refresh(req, res) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({
        status: 401,
        message: 'Пожалуйста авторизуйтесь',
      });
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      return res.status(401).json({
        status: 401,
        message: 'Пользователь не автризован',
      });
    }

    const user = await User.findById(userData.id);

    const userDTO = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDTO });

    await TokenService.saveToken(userDTO.id, tokens.refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const data = { tokens, user: userDTO };

    res.status(200).json(data);
  }
  async getAllUsers(req, res) {
    const users = await User.find();
    console.log(users);
    res.json(users);
  }
  getCurrentUser = async (req, res) => {
    if (!req.user) {
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
    const user = await User.findById(req.user.id).populate('userAvatar');

    const userDTO = new UserDto(user);

    res.status(200).json({
      ...userDTO,
    });
  };
  async getUsers(req, res) {
    const userId = req.user.id;

    if (!userId) {
      res.status(404).json('user not found');
    }
    res.status(200).json(userId);
  }
  async findUser(req, res) {
    const query = req.query.query;

    const users = await User.find({ name: new RegExp(query, 'i') });
    if (!users) {
      res.json({
        status: 'error',
        error: err,
      });
    }

    const fUsers = users.map((user) => new UserDto(user));

    res.json(fUsers);
  }
  updateUser = async (req, res) => {
    const data = req.body;

    const postData = {
      email: data.email,
      name: data.name,
      userAvatar: data.avatar,
      nickName: data.nickName,
      info: data.info,
      birthday: data.date,
    };
    const doc = await User.findOneAndUpdate({ _id: data.user }, postData);

    if (!doc) {
      res.status(404).json('error doc not found');
    }
    this.io.emit('getCurrentUser', doc);
    res.status(200).json('success');
  };

  updateUsersConv = async (req, res) => {
    const value = req.body.value;
    const members = req.body.members;

    try {
      const users = await User.find({ name: new RegExp(value, 'i'), _id: { $nin: members } });
      const fUsers = users.map((user) => new UserDto(user));
      res.json(fUsers);
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = UserController;
