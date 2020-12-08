const router = require('express').Router();
let RefreshToken = require('../models/refreshTokenModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('../middleware');

router.post('/add', (req, res, next) => {
  const newRefreshToken = new RefreshToken({
    refreshToken: jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET)
  });
  console.log(newRefreshToken);
  newRefreshToken.save()
    .then(refreshToken => console.log(refreshToken))
    .catch(error => res.status(400).json("Error: " + error))
})

module.exports = router