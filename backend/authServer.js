const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/userRoutes');
// const refreshTokensRouter = require('./routes/refreshTokenRoutes')
// const jobsRouter = require('./routes/jobRoutes');
// const candidatesRouter = require('./routes/candidateRoutes');

require('dotenv').config();

const app = express();
const port = process.env.AUTHPORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const mongoDbUrl = process.env.MONGODB_URL;
mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection made")
}) 

app.use('/users', usersRouter);
// app.use('/refresh-tokens', )

app.listen(port, () => {
  console.log('server is listening on port', port)
})