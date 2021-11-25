const UserController = require('../Controllers/userController');
const Router = require('express').Router;
const router = new Router();

const { body } = require('express-validator');

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 24 }),
  UserController.registration,
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refresh);
router.get('/activate/:link', UserController.activationAccaunt);
router.get('/getAllUsers', UserController.getAllUsers);

module.exports = router;
