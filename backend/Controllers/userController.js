const UserModel = require('../Models/User');

class UserController {
  async registration(req, res) {
    console.log(req.body);
    res.json('asdasd');
    // const candidate = await UserModel.findOne(req.body.email);
    // if (candidate) {
    //   throw new Error('пользователь с такии email уже существует!');
    // }
  }
}

module.exports = new UserController();
