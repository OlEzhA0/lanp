const { uploadToServer } = require('./upload');
const { deletePhotosS3 } = require('./deletePhotosS3');

module.exports = {
  uploadToServer,
  deletePhotosS3
}