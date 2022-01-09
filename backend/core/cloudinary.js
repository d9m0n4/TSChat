const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dxyprpult',
  api_key: '496627921199952',
  api_secret: 'dhpUhu3MDVy9TdoOcnw1Nr3EAUw',
});

module.exports = cloudinary;
