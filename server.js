// server.js (add endpoint for analysis)
const { spawn } = require('child_process');

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
