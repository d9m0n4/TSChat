const UserController = require('../Controllers/userController');

const Router = require('express').Router;

const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login');
router.get('/activate/:link');

module.exports = router;
