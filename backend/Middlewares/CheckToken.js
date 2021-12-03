const tokenService = require('../Services/token-service');

module.exports = function (req, res, next) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    res.status(401).json({
      status: 401,
      message: 'Нет доступа. Пользователь не авторизован',
    });
    throw new Error('пользователь не авторизован');
  }

  const accessToken = authHeaders.split(' ')[1];

  const userData = tokenService.validateAccessToken(accessToken);

  if (!userData) {
    res.status(401).json({
      status: 401,
      message: 'Нет доступа. Пользователь не авторизован',
    });
    throw new Error('пользователь не авторизован');
  }

  req.user = userData;

  next();
};
