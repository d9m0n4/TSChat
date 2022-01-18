const Dialog = require('../Models/Dialog');
const Message = require('../Models/Message');

const cloudinary = require('../core/cloudinary');
const UploadedFile = require('../Models/UploadedFile');

class UploadFilesController {
  constructor(io) {
    this.io = io;
  }

  create = (req, res) => {
    const user = req.user.id;
    const files = req.files;

    let cp = files.map((file) => {
      cloudinary.uploader.upload_stream();
    });
    console.log(cp);
  };

  delete = (req, res) => {
    const fileId = req.user.id;
    const public_id = req.query.id;

    cloudinary.uploader.destroy(public_id, (err, result) => {
      if (err) {
        res.json(err);
      }
    });

    UploadedFile.deleteOne({ pid: public_id }, function (err) {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: err,
        });
      }
      res.json({
        status: 'success',
      });
    });
  };
}

module.exports = UploadFilesController;
