const express = require('express');
const greetingRoutes = require('./routes/greeting'); // Import greeting API routes

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Use greeting routes
app.use('/api', greetingRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
