const User = require('../Models/User');
const SendMail = require('../Services/mail-service');
const TokenService = require('../Services/token-service');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserDto = require('../DTOS/user-dto');
const { validationResult } = require('express-validator');
require('dotenv').config();

class UserController {
  async registration(req, res) {
    try {
      const { email, name, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.json('ошибка при валидации');
        res.json(errors);
        throw new Error('ошибка при валидации');
      }

      const candidate = await User.findOne({ email });

      if (candidate) {
        res.json('Пользователь с таким email уже существует');
        throw new Error('Пользователь с таким email уже существует');
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
    const link = req.params.link;

    const user = await User.findOne({ link });

    if (!user) {
      throw new Error('Некорректная ссылка активации');
    }

    user.isActivated = true;

    await user.save();
    res.redirect(process.env.CLIENT_URL);
  }
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.json('пользователя не существует');
      throw new Error('пользователя не существует');
    }

    const identPass = await bcrypt.compare(password, user.password);
    if (!identPass) {
      res.json('Неверный пароль');
      throw new Error('Неверный пароль');
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
  }
  async logout(req, res) {
    const { refreshToken } = req.cookies;
    const token = await TokenService.deleteToken(refreshToken);
    res.clearCookie('refreshToken');
    res.json(token);
  }
  async refresh(req, res) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({
        status: 401,
        message: 'token not found',
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
    res.json(users);
  }
}

module.exports = new UserController();
