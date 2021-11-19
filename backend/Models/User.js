const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  ActivationLink: {
    type: String,
  },
  userAvatar: {
    type: String,
  },
});

module.exports = model('UserModel', UserSchema);
