const tokenService = require('../Services/token-service');

module.exports = function (req, res, next) {
  const authHeaders = req.headers.authorization;

  const accessToken = authHeaders.split(' ')[1];

  const userData = tokenService.validateAccessToken(accessToken);

  req.user = userData;

  next();
};
