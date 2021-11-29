const tokenService = require('../Services/token-service');

module.exports = function (req, res, next) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    console.log('пользователь не авторизован');
    throw new Error('пользователь не авторизован');
  }

  const accessToken = authHeaders.split(' ')[1];

  const userData = tokenService.validateAccessToken(accessToken);

  if (!userData) {
    console.log('пользователь не авторизован');
    throw new Error('пользователь не авторизован');
  }

  req.user = userData;

  next();
};
