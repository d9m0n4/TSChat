const { Schema, model } = require('mongoose');
const User = require('./User');

const ConversationSchema = new Schema(
  {
    title: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    members: [{ type: Schema.Types.ObjectId, ref: User }],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Conversation', ConversationSchema);
