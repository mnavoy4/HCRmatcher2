const router = require('express').Router();
let Candidate = require('../models/candidateModel');

router.get('/', (req, res) => {
  Candidate.find()
    .then(candidates => res.json(candidates))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.post('/add', (req, res) => {
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