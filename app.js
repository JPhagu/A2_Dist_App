const express = require('express');
const app = express();
const db = require('./data/db');  // Assuming you have your db setup here

// Middleware
app.use(express.json());

// Define the routes

// Greet route
app.post('/api/greeting', (req, res) => {
  const { timeOfDay, language, tone } = req.body;

  // Logic to fetch greeting from the database based on these parameters
  // Respond with the greeting
  res.json({ greetingMessage: "Hello, Good " + timeOfDay });
});

// Get available times of day route
app.get('/api/timesOfDay', (req, res) => {
  const timesOfDay = ['Morning', 'Afternoon', 'Evening'];
  res.json(timesOfDay);
});

// Get supported languages route
app.get('/api/languages', (req, res) => {
  const languages = ['English', 'French', 'Spanish'];
  res.json(languages);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
