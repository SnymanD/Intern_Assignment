// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/surveyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const surveySchema = new mongoose.Schema({
  fullName: String,
  email: String,
  dateOfBirth: Date,
  contactNumber: String,
  favoriteFood: [String],
  watchMovies: Number,
  listenToRadio: Number,
  eatOut: Number,
  watchTV: Number,
});

const Survey = mongoose.model('Survey', surveySchema);

app.post('/api/survey', async (req, res) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(201).send(survey);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/analyze', (req, res) => {
  const process = spawn('python', ['./analysis.py']);

  process.stdout.on('data', (data) => {
    const results = JSON.parse(data.toString());
    res.status(200).json(results);
  });

  process.stderr.on('data', (data) => {
    res.status(500).send(data.toString());
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

