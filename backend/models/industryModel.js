const mongoose = require('mongoose');
const industrySchema = new mongoose.Schema({
  industry: { type: String, required: true }
});

const industryModel = mongoose.model('Industry', industrySchema);

module.exports = industryModel;