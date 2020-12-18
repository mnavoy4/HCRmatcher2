const router = require('express').Router();
const joi = require('joi');
let Skill = require('../models/skillModel');

const validationSchema = joi.object({
  skill: joi.string().min(1).max(20).required()
})

router.get('/', (req, res) => {
  Skill.find()
    .then(skills => res.json(skills))
    .catch(error => res.status(400).json('Error in finding all skills: ' + error))
})

router.post('/add', (req, res) => {
  const { error } = validationSchema.validate(req.body);
  console.log(error)
  if (error) return res.status(400).send(error.details)
  const newSkill = new Skill({
    skill: req.body.skill
  })
  newSkill.save()
    .then(skill => res.json(skill))
    .catch(error => res.status(400).json('Error creating new skill: ' + error))
})

router.delete(':id', (req, res) => {
  Skill.findByIdAndDelete(req.params.id)
    .then(() => res.json("Skill Deleted"))
    .catch(error => res.status(400).json('Error deleting skill: ' + error))
})

router.get('/:id', (req, res) => {
  Skill.findById(req.params.id)
    .then(skill => res.json(skill))
    .catch(error => res.status(400).json('Error finding single skill: ' + error))
})

router.post('/update/:id', (req, res) => {
  Skill.findById(req.params.id)
    .then(skill => {
      skill.skill = req.body.skill;
      skill.save()
        .then(updatedSkill => res.json(updatedSkill))
        .catch(error => res.status(400).json('Error saving skill inside finding skill by id: ' + error))
    })
    .catch(error => res.status(400).json('Error updating skill: ' + error))
})

module.exports = router