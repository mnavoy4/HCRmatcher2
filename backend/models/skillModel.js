const mongoose = require('mongoose');
const skillSchema = new mongoose.Schema({
  skill: { type: String, required: true }
});

const skillModel = mongoose.model('Skill', skillSchema);

module.exports = skillModel;