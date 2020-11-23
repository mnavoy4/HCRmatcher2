const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  industries: { type: Array },
  remote: { type: Boolean },
  jobDescription: { type: String, required: true },
  candidates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate"
  }],
  willingToSponsor: { type: Boolean, required: true },
  citizenshipRequired: {type: Boolean, required: true },
  relocationAssistance: { type: Boolean, required: true },
  client: { type: String },
  salaryRange: { type: String, required: true },
  skillsRequired: { type: Array, required: true },
  degreesRequired: { type: Array, required: true },
  tags: { type: Array },
  recruiter: { type: String },
  status: { type: String, enum: ['Open', 'Closed', 'Paused'] },
  employementType: { type: String, enum: ['Full Time', 'Contract', 'Part Time'] },
  clientFee: { type: Number, required: true }
});

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function capitalizeEachWord(string){
  return string.split(' ').map(capitalize).join(' ');
}

// jobSchema.pre('save', function(next){
//   capitalizeEachWord(this.title);
//   capitalizeEachWord(this.city);
//   capitalizeEachWord(this.state);
//   capitalizeEachWord(this.client);
//   capitalizeEachWord(this.recruiter);
//   capitalizeEachWord(this.employementType);
//   capitalizeEachWord(this.status);
//   next();
// })

const jobModel = mongoose.model('Job', jobSchema);

module.exports = jobModel;