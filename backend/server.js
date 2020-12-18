const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const usersRouter = require('./routes/userRoutes');
const jobsRouter = require('./routes/jobRoutes');
const candidatesRouter = require('./routes/candidateRoutes');
const industriesRouter = require('./routes/industryRoutes');
const skillsRouter = require('./routes/skillRoutes')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const mongoDbUrl = process.env.MONGODB_URL;
mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection made")
}) 
app.use('/jobs', jobsRouter);
app.use('/candidates', candidatesRouter);
app.use('/users', usersRouter);
app.use('/industries', industriesRouter);
app.use('/skills', skillsRouter);
// app.use('refresh-tokens', )

app.listen(port, () => {
  console.log('server is listening on port', port)
})