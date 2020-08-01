const mongoose = require('mongoose');
const { Schema } = mongoose;

const colorsSchema = new Schema({
  login: { unique: true, type: String },
  password: String,
  name: String,
  photos: [String]
})

module.exports = mongoose.model('users', colorsSchema);