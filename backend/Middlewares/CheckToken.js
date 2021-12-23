const tokenService = require('../Services/token-service');

module.exports = function (req, res, next) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    res.status(401).json({
      status: 401,
      message: 'Нет доступа. Пользователь не авторизован H',
    });
    throw new Error('пользователь не авторизован H');
  }

  const accessToken = authHeaders.split(' ')[1];
  console.log(accessToken);

  const userData = tokenService.validateAccessToken(accessToken);

  if (!userData) {
    res.status(401).json({
      status: 401,
      message: 'Нет доступа. Пользователь не авторизован U',
    });
    throw new Error('пользователь не авторизован U');
  }

  req.user = userData;

  next();
};
