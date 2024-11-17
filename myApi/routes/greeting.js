const express = require('express');
const db = require('../data/db'); // Database connection
const router = express.Router();

// POST route to fetch a greeting based on timeOfDay, language, and tone
router.post('/greeting', (req, res) => {
    const { timeOfDay, language, tone } = req.body;

    // Validate the request body
    if (!timeOfDay || !language || !tone) {
        return res.status(400).json({ error: 'timeOfDay, language, and tone are required.' });
    }

    // Query the database to fetch the corresponding greeting message
    db.get('SELECT greetingMessage FROM Greetings WHERE timeOfDay = ? AND language = ? AND tone = ?',
        [timeOfDay, language, tone], (err, row) => {
            if (err) {
                console.error('Error fetching greeting:', err.message);
                return res.status(500).send('Internal Server Error');
            }

            if (!row) {
                return res.status(404).json({ error: 'Greeting not found for the given criteria.' });
            }

            // Send the response with the greeting message (GreetingResponse model)
            const greetingResponse = {
                greetingMessage: row.greetingMessage,
            };

            res.json(greetingResponse);  // Return the GreetingResponse model
        });
});

// GET route to fetch all available timeOfDay values
router.get('/timesOfDay', (req, res) => {
    db.all('SELECT DISTINCT timeOfDay FROM Greetings', [], (err, rows) => {
        if (err) {
            console.error('Error fetching timeOfDay values:', err.message);
            return res.status(500).send('Internal Server Error');
        }

        const timesOfDay = rows.map(row => row.timeOfDay);
        res.json(timesOfDay);  // Return all timeOfDay values
    });
});

// GET route to fetch all supported languages
router.get('/languages', (req, res) => {
    db.all('SELECT DISTINCT language FROM Greetings', [], (err, rows) => {
        if (err) {
            console.error('Error fetching language values:', err.message);
            return res.status(500).send('Internal Server Error');
        }

        const languages = rows.map(row => row.language);
        res.json(languages);  // Return all language values
    });
});

module.exports = router;
