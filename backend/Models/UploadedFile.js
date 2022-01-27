const { Schema, model } = require('mongoose');

const UploadFileSchema = new Schema({
  filename: {
    type: String,
  },
  size: Number,
  ext: String,
  url: String,
  thumb: String,
  pid: String,
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('UploadedFile', UploadFileSchema);
