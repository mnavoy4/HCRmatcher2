const router = require('express').Router();
const joi = require('joi');
let Industry = require('../models/industryModel');

const validationSchema = joi.object({
  industry: joi.string().min(2).max(20).required()
})

router.get('/', (req, res) => {
  Industry.find()
    .then(industries => res.json(industries))
    .catch(error => res.status(400).json('Error in finding all industries: ' + error))
})

router.post('/add', (req, res) => {
  const { error } = validationSchema.validate(req.body);
  console.log(error)
  if (error) return res.status(400).send(error.details)
  const newIndustry = new Industry({
    industry: req.body.industry
  })
  newIndustry.save()
    .then(industry => res.json(industry))
    .catch(error => res.status(400).json('Error creating new industry: ' + error))
})

router.delete(':id', (req, res) => {
  Industry.findByIdAndDelete(req.params.id)
    .then(() => res.json("Industry Deleted"))
    .catch(error => res.status(400).json('Error deleting industry: ' + error))
})

router.get('/:id', (req, res) => {
  Industry.findById(req.params.id)
    .then(industry => res.json(industry))
    .catch(error => res.status(400).json('Error finding single industry: ' + error))
})

router.post('/update/:id', (req, res) => {
  Industry.findById(req.params.id)
    .then(industry => {
      industry.industry = req.body.industry;
      industry.save()
        .then(updatedIndustry => res.json(updatedIndustry))
        .catch(error => res.status(400).json('Error saving industry inside finding industry by id: ' + error))
    })
    .catch(error => res.status(400).json('Error updating industry: ' + error))
})

module.exports = router