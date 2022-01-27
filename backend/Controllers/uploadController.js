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
    const file = req.file;

    cloudinary.uploader
      .upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error || !result) {
          return res.status(500).json({
            status: 'error',
            message: error || 'upload error',
          });
        }

        console.log(result);

        const fileData = {
          filename: result.original_filename,
          size: result.bytes,
          ext: result.format,
          url: result.url,
          thumb: cloudinary.image(result.url, {
            width: 300,
            quality: 'auto',
            fetch_format: 'auto',
            crop: 'scale',
          }),
          pid: result.public_id,
          user: user,
        };

        const uploadedFile = new UploadedFile(fileData);

        uploadedFile
          .save()
          .then((file) => {
            res.json({ status: 200, file: file });
          })
          .catch((err) => ({
            message: 'error',
            error: err,
          }));
      })
      .end(file.buffer);
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
