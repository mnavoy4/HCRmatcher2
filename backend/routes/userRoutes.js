const router = require('express').Router();
let User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json('Error ' + error))
})

router.post('/add', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      jobTitle: req.body.jobTitle,
      phoneNumber: req.body.phoneNumber,
      manager: req.body.manager
    })
    console.log(newUser);
    newUser.save()
      .then(user => res.send(user))
      .catch(error => res.status(400).json('Error: ' + error))
  }
  catch {
    res.status(500).send()
  }
})

router.post('/login', async (req, res) => {

  // const { body } = req;
  // const { email, password } = body;

  const foundUser = await User.find({ email: req.body.email }).exec()

  console.log(foundUser)

  if (!foundUser){
    return res.status(400).send('Cannot find User')
  }
  try {
    if (await bcrypt.compare(req.body.password, foundUser.password)){
      res.json(foundUser)
    } else {
      res.send('Not allowed')
    }
  } catch {
    res.status(500).send("Something to send")
  }

  // if (email === foundUser.email && password === foundUser.password){
  //   jwt.sign({foundUser}, 'bassnectar', { expiresIn: '24h'}, (err, token) => {
  //     if (err) { console.log(err) }
  //     res.send(token); 
  //   });
  // } else { console.log('ERROR : Could not log in') }
})

module.exports = router