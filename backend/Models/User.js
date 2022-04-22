const { Schema, model, SchemaTypes } = require('mongoose');

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
  activationLink: {
    type: String,
  },
  userAvatar: { type: String, default: null },
  nickName: {
    type: String,
  },
  info: {
    type: String,
  },
  birthday: { type: Date },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date },
});

module.exports = model('User', UserSchema);
