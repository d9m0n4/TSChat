const UserController = require('../Controllers/userController');
const DialogConroller = require('../Controllers/dialogController');
const Router = require('express').Router;
const router = new Router();

const CheckToken = require('../Middlewares/CheckToken');

const { body } = require('express-validator');

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 24 }),
  UserController.registration,
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);
router.get('/activate/:link', UserController.activationAccaunt);
router.get('/getAllUsers', CheckToken, UserController.getAllUsers);
router.get('/getCurrentUser', CheckToken, UserController.getCurrentUser);
router.get('/user/find', CheckToken, UserController.findUser);

router.post('/dialogs', CheckToken, DialogConroller.createDialog);
router.get('/dialogs', CheckToken, DialogConroller.getDialogs);

module.exports = router;
