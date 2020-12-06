const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true, unique: true },
  jobTitle: { type: String },
  phoneNumber: { type: String, required: false, unique: true },
  manager: { type: String }
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel
