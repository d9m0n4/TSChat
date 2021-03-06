const cloudinary = require('../core/cloudinary');
const UploadedFile = require('../Models/UploadedFile');
const Message = require('../Models/Message');
const Dialog = require('../Models/Dialog');

class UploadFilesController {
  constructor(io) {
    this.io = io;
  }

  create = (req, res) => {
    const user = req.user.id;
    const file = req.file;

    cloudinary.uploader
      .upload_stream({ resource_type: 'auto', use_filename: true }, (error, result) => {
        if (error || !result) {
          return res.status(500).json({
            status: 'error',
            message: error || 'upload error',
          });
        }

        const fileData = {
          filename: file.originalname,
          size: result.bytes,
          ext: result.format,
          url: result.url,
          thumb: cloudinary.url(result.public_id, {
            width: 300,
            quality: 'auto',
            fetch_format: 'auto',
            crop: 'scale',
          }),
          pid: result.public_id,
          user: user,
          isAudio: result.is_audio || false,
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

  getAttachments = async (req, res) => {
    const dialogId = req.query.id;
    const currentUserId = req.user.id;

    try {
      Dialog.findById(dialogId)
        .populate('members')
        .exec((err, result) => {
          if (err) {
            return res.json(err);
          }
          const partners = result.members;
          const { _id } = partners.find((item) => item._id.toString() !== currentUserId);
          const partnerId = _id.toString();
          Message.find({ dialog: dialogId })
            .select(['attachments', 'user'])
            .populate('attachments')
            .exec((err, result) => {
              if (err) {
                return res.json(err);
              }

              const partnerMessages = result
                .filter((item) => item.attachments.length)
                .filter((item) => item.user == partnerId)
                .map((item) => item.attachments)
                .flat();

              res.status(200).json(partnerMessages);
            });
        });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error' + Error,
        status: 500,
      });
    }
  };
}

module.exports = UploadFilesController;
