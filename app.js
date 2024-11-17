const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Middleware
app.use(express.json());

// Connect to SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to SQLite database.');
});

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Web API!');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
