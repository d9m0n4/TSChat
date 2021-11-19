const { Schema, model } = require('mongoose');
const User = require('./User');

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  refreshToken: {
    type: String,
  },
});

module.exports = model('TokenModel', TokenSchema);
