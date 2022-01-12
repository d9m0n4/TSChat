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
  activationLink: {
    type: String,
  },
  userAvatar: {
    type: String,
  },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now() },
});

module.exports = model('User', UserSchema);
