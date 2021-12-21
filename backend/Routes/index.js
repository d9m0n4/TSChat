const UserController = require('../Controllers/userController');
const DialogConroller = require('../Controllers/dialogController');
const MessageController = require('../Controllers/messageController');
const Router = require('express').Router;
const router = new Router();

const CheckToken = require('../Middlewares/CheckToken');

const { body } = require('express-validator');

const routes = (io) => {
  const UserCtrl = new UserController(io);
  const DialogCtrl = new DialogConroller(io);
  const MessageCtrl = new MessageController(io);

  router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 24 }),
    UserCtrl.registration,
  );
  router.post('/login', UserCtrl.login);
  router.post('/logout', UserCtrl.logout);
  router.get('/refresh', UserCtrl.refresh);
  router.get('/activate/:link', UserCtrl.activationAccaunt);
  router.get('/getAllUsers', CheckToken, UserCtrl.getAllUsers);
  router.get('/getCurrentUser', CheckToken, UserCtrl.getCurrentUser);
  router.get('/user/find', CheckToken, UserCtrl.findUser);

  router.post('/dialogs', CheckToken, DialogCtrl.createDialog);
  router.get('/dialogs', CheckToken, DialogCtrl.getDialogs);

  router.get('/messages', MessageCtrl.getMessages);

  return router;
};

module.exports = routes;
