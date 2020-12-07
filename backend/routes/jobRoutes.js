const router = require('express').Router();
let Job = require('../models/jobModel');
const { authenticateToken } = require('../middleware');

router.get('/', (req, res) => {
  Job.find()
    .then(jobs => res.json(jobs))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.post('/add', authenticateToken, (req, res) => {
  const newJob = new Job({
    title: req.body.title,
    city: req.body.city,
    state: req.body.state,
    industries: req.body.industries,
    remote: req.body.wantsRemote,
    jobDescription: req.body.jobDescription,
    candidates: req.body.candidates,
    willingToSponsor: req.body.willingToSponsor,
    citizenshipRequired: req.body.citizenshipRequired,
    relocationAssistance: req.body.relocationAssistance,
    client: req.body.client,
    securityClearanceRequired: req.body.securityClearanceRequired,
    salaryRange: req.body.salaryRange,
    skillsRequired: req.body.skillsRequired,
    degreesRequired: req.body.degreesRequired,
    tags: req.body.tags,
    recruiter: req.body.recruiter,
    status: req.body.status,
    employementType: req.body.employementType,
    clientFee: req.body.clientFee,
    notes: req.body.notes
  });
  newJob.save()
    .then(job => res.json(job))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.get('/:id', (req, res) => {
  Job.findById(req.params.id)
    .then(job => res.json(job))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.delete('/:id', (req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then(() => res.json("Job Deleted"))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.post('/update/:id', (req, res) => {
  Job.findById(req.params.id)
    .then(job => {
      job.title = req.body.title;
      job.city = req.body.city;
      job.state = req.body.state;
      job.industries = req.body.industries;
      job.remote = req.body.wantsRemote;
      job.jobDescription = req.body.jobDescription;
      job.candidates = req.body.candidates;
      job.willingToSponsor = req.body.willingToSponsor;
      job.citizenshipRequired = req.body.citizenshipRequired;
      job.relocationAssistance = req.body.relocationAssistance;
      job.client = req.body.client;
      job.securityClearanceRequired = req.body.securityClearanceRequired;
      job.salaryRange = req.body.salaryRange;
      job.skillsRequired = req.body.skillsRequired;
      job.degreesRequired = req.body.degreesRequired;
      job.tags = req.body.tags;
      job.recruiter = req.body.recruiter;
      job.status = req.body.status;
      job.employementType = req.body.employementType;
      job.clientFee = req.body.clientFee;
      job.notes = req.body.notes;
      job.save()
        .then(updatedJob => res.json(updatedJob))
        .catch(error => res.status(400).json('Error: ' + error))
    })
    .catch(error => res.status(400).json('Error: ' + error))
})

module.exports = router