const router = require('express').Router();
let User = require('../models/userModel');
let RefreshToken = require('../models/refreshTokenModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { authenticateToken } = require('../middleware');

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
    newUser.save()
      .then(user => res.json(user))
      .catch(error => res.status(400).json('Error: ' + error))
  }
  catch {
    res.status(500).send()
  }
})

router.post('/login', async (req, res, next) => {

  console.log(req.body)

  const foundUser = await User.findOne({ email: req.body.email }).exec()

  console.log(foundUser)

  if (!foundUser){
    return res.status(400).send('Cannot find User')
  }

  console.log(await bcrypt.compare(req.body.password, foundUser.password))
  try {
    if (await bcrypt.compareSync(req.body.password, foundUser.password)){
      // console.log('entered')
      const accessToken = jwt.sign(foundUser.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
      const refreshToken = jwt.sign(foundUser.toJSON(), process.env.REFRESH_TOKEN_SECRET)
      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    } else {
      res.send('Not allowed')
    }
  } catch (error) {
    res.status(500).send("Error: " + error);
    next(error);
  }
})

module.exports = router