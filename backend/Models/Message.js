const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dialog: {
      type: Schema.Types.ObjectId,
      ref: 'Dialog',
      required: true,
    },
    text: {
      type: String,
    },
    attachments: [{ type: Schema.Types.ObjectId, ref: 'UploadedFile' }],
  },
  {
    timestamps: true,
  },
);

module.exports = model('Message', MessageSchema);
