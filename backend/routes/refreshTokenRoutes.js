const router = require('express').Router();
let RefreshToken = require('../models/refreshTokenModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('../middleware');

