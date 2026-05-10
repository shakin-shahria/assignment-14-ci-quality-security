const express = require('express');
const { add, formatResponse } = require('./app');

const app = express();
app.use(express.json());

const apiKey = process.env.API_KEY || 'unset-api-key';

app.get('/api/hello', (req, res) => {
  res.json(formatResponse('success', 'Hello from Assignment 14 API', { apiKey: apiKey ? 'configured' : 'missing' }));
});

app.get('/api/add', (req, res) => {
  const { a, b } = req.query;
  if (a === undefined || b === undefined) {
    return res.status(400).json(formatResponse('error', 'Query parameters a and b are required'));
  }

  const result = add(a, b);
  return res.json(formatResponse('success', 'Sum calculated', { result }));
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
