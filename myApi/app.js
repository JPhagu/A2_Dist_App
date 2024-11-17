const express = require('express');
const bodyParser = require('body-parser');
const greetingRoutes = require('./routes/greeting');  // Import greeting.js routes
const app = express();
const db = require('./data/db');  // Database connection

// Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));  // For URL-encoded bodies

// Use the greeting routes under the /api path
app.use('/api', greetingRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
