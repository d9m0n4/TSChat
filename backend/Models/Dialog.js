const { Schema, model } = require('mongoose');

const DialogSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    partner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Dialog', DialogSchema);
