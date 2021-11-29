const { Schema, model } = require('mongoose');
const User = require('./User');

const ConversationSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Conversation', ConversationSchema);
