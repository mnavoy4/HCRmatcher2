const router = require('express').Router();
const joi = require('joi');
let Candidate = require('../models/candidateModel');

const validationSchema = joi.object({
  name: joi.string().min(3).max(25).required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required(),
  city: joi.string().min(2).max(20),
  state: joi.string().required().min(2).max(14),
  wantsRemote: joi.boolean(),
  openToRelocation: joi.boolean(),
  willingToGo: joi.array().items(joi.object()),
  usCitizen: joi.boolean().required(),
  clearance: joi.string().min(4),
  industriesWorkedIn: joi.array().items(joi.object()),
  companiesWorkedFor: joi.array().items(joi.object()),
  startupExperience: joi.boolean().required(),
  skills: joi.array().items(joi.object()),
  tags: joi.array().items(joi.object()),
  currentSalary: joi.number().integer().max(1000000).min(100).positive(),
  degrees: joi.array().items(joi.object()),
  certifications: joi.array().items(joi.object()),
  jobTitles: joi.array().items(joi.object()),
  stageInProcess: joi.string().required(),
  notes: joi.string().min(3),
  jobsAppliedFor: joi.string(),
  jobsMatchedFor: joi.string()
})

router.get('/', (req, res) => {
  Candidate.find()
    .then(candidates => res.json(candidates))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.post('/add', (req, res) => {

  const { error } = validationSchema.validate(req.body);
  console.log(error)
  if (error) return res.status(400).send(error.details);
  const newCandidate = new Candidate({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    state: req.body.state,
    wantsRemote: req.body.wantsRemote,
    openToRelocation: req.body.openToRelocation,
    willingToGo: req.body.willingToGo,
    usCitizen: req.body.usCitizen,
    clearance: req.body.clearance,
    industriesWorkedIn: req.body.industriesWorkedIn,
    companiesWorkedFor: req.body.companiesWorkedFor,
    startupExperience: req.body.startupExperience,
    skills: req.body.skills,
    tags: req.body.tags,
    currentSalary: req.body.currentSalary,
    degrees: req.body.degrees,
    certifications: req.body.certifications,
    jobTitles: req.body.jobTitles,
    stageInProcess: req.body.stageInProcess,
    jobsAppliedFor: req.body.jobsAppliedFor,
    jobsMatchedFor: req.body.jobsMatchedFor,
    notes: req.body.notes
  });
  console.log(newCandidate);
  newCandidate.save()
    .then(candidate => res.json(candidate))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.get('/:id', (req, res) => {
  Candidate.findById(req.params.id)
    .then(candidate => res.json(candidate))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.delete('/:id', (req, res) => {
  Candidate.findByIdAndDelete(req.params.id)
    .then(() => res.json("Candidate Deleted"))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.post('/update/:id', (req, res) => {
  Candidate.findById(req.params.id)
    .then(candidate => {
      candidate.name = req.body.name;
      candidate.email = req.body.email;
      candidate.phoneNumber = req.body.phoneNumber;
      candidate.city = req.body.city;
      candidate.state = req.body.state;
      candidate.wantsRemote = req.body.wantsRemote;
      candidate.openToRelocation = req.body.openToRelocation;
      candidate.willingToGo = req.body.willingToGo;
      candidate.usCitizen = req.body.usCitizen;
      candidate.clearance = req.body.clearance;
      candidate.industriesWorkedIn = req.body.industriesWorkedIn;
      candidate.companiesWorkedFor = req.body.companiesWorkedFor;
      candidate.startupExperience = req.body.startupExperience;
      candidate.skills = req.body.skills;
      candidate.tags = req.body.tags;
      candidate.currentSalary = req.body.currentSalary;
      candidate.degrees = req.body.degrees;
      candidate.certifications = req.body.certifications;
      candidate.jobTitles = req.body.jobTitles;
      candidate.stageInProcess = req.body.stageInProcess;
      candidate.jobsAppliedFor = req.body.jobsAppliedFor;
      candidate.jobsMatchedFor = req.body.jobsMatchedFor;
      candidate.notes = req.body.notes;
      candidate.save()
        .then(updatedCandidate => res.json(updatedCandidate))
        .catch(error => res.status(400).json('Error: ' + error))
    })
    .catch(error => res.status(400).json('Error: ' + error))
})

module.exports = router