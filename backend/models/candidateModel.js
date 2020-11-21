const mongoose = require('mongoose');
const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false, unique: true },
  city: { type: String },
  state: { type: String },
  wantsRemote: { type: Boolean },
  openToRelocation: { type: Boolean },
  usCitizen: { type: Boolean },
  clearance: { type: String },
  industriesWorkedIn: { type: Array }
})