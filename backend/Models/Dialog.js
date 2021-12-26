const { Schema, model } = require('mongoose');

const DialogSchema = new Schema(
  {
    members: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Dialog', DialogSchema);
