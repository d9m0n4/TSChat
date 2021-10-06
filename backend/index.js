const express = require('express');

const UserModel = require('./Models/User')

const app = express();

app.listen(8000, () => {
  console.log('server has been started');
});
