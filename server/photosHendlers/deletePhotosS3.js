const { deleteFile } = require('../uploadFile')

const deletePhotosS3 = (req, res) => {
  const { photo } = JSON.parse(req.body);
  deleteFile(photo.split(`https://${process.env.Bucket}.s3.amazonaws.com/`)[1]);
  res.json({ status: "success" })
}

module.exports = { deletePhotosS3 }