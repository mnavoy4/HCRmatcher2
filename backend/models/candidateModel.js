const mongoose = require('mongoose');
const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false, unique: true },
  city: { type: String },
  state: { type: String, required: true },
  wantsRemote: { type: Boolean },
  openToRelocation: { type: Boolean, required: true },
  willingToGo: { type: Array },
  usCitizen: { type: Boolean, required: true },
  clearance: { type: String, required: true, enum: ["None", "Secret", "Public Trust", "Top Secret", "TS/SCI", "Confidential"] },
  industriesWorkedIn: { type: Array, required: true },
  companiesWorkedFor: { type: Array },
  startupExperience: { type: Boolean },
  skills: { type: Array, required: true },
  tags: { type: Array },
  currentSalary: { type: Number },
  degrees: { type: Array, required: true },
  certifications: { type: Array },
  jobTitles: { type: Array, required: true },
  stageInProcess: { type: String, enum: ["Submitted", "Client Interview", "Zoom Screen", "Hired", "Not Hired", "Offer Made"], required: true },
  jobsAppliedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  }],
  jobsMatchedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  }]
});

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function capitalizeEachWord(string){
  return string.split(' ').map(capitalize).join(' ');
}

// candidateSchema.pre('save', function(next){
//   capitalizeEachWord(this.name);
//   capitalizeEachWord(this.city);
//   capitalizeEachWord(this.state);
//   capitalizeEachWord(this.clearance);
//   capitalizeEachWord(this.stageInProcess);
//   this.state.charAt(0).toUpperCase() + this.state.slice(1).toLowerCase()
//   next();
// 

const candidateModel = mongoose.model("Candidate", candidateSchema);

module.exports = candidateModel;
