const UserController = require('../Controllers/userController');
const DialogController = require('../Controllers/dialogController');
const MessageController = require('../Controllers/messageController');
const UploadController = require('../Controllers/uploadController');
const ConversationController = require('../Controllers/conversationController');

const Router = require('express').Router;
const router = new Router();

const uploader = require('../core/multer');

const CheckToken = require('../Middlewares/CheckToken');

const { body } = require('express-validator');

const Routes = (io) => {
  const UserCtrl = new UserController(io);
  const DialogCtrl = new DialogController(io);
  const ConversationCtrl = new ConversationController(io);
  const MessageCtrl = new MessageController(io);
  const UploadCtrl = new UploadController(io);

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
  router.patch('/user', CheckToken, UserCtrl.updateUser);

  router.post('/dialogs', CheckToken, DialogCtrl.createDialog);
  router.get('/dialogs', CheckToken, DialogCtrl.getDialogs);

  router.post('/conversations', CheckToken, ConversationCtrl.createConversation);
  router.get('/conversations', CheckToken, ConversationCtrl.getConversations);

  router.get('/messages', CheckToken, MessageCtrl.getMessages);
  router.get('/messages/history', CheckToken, MessageCtrl.getMessagesHistory);
  router.get('/messages/user', CheckToken, MessageCtrl.getMessagesOfUser);
  router.post('/messages', CheckToken, MessageCtrl.createMessage);

  router.post('/files', CheckToken, uploader.single('file'), UploadCtrl.create);
  router.get('/files', CheckToken, UploadCtrl.getAttachments);
  router.delete('/files', CheckToken, UploadCtrl.delete);

  return router;
};

module.exports = Routes;
