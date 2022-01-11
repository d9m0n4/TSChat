const { Schema, model } = require('mongoose');
const User = require('../Models/User');

const DialogSchema = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: User }],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  },

  {
    timestamps: true,
  },
);

module.exports = model('Dialog', DialogSchema);
