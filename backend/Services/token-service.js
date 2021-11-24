const jwt = require('jsonwebtoken');
const TokenModel = require('../Models/token');
require('dotenv').config();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '15d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({ user: userId, refreshToken });

    return token;
  }
}

module.exports = new TokenService();
