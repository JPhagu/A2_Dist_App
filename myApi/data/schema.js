const db = require('./data/db'); // Import the database connection

// Ensure Greetings table exists
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Greetings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timeOfDay TEXT NOT NULL,
            language TEXT NOT NULL,
            greetingMessage TEXT NOT NULL,
            tone TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Error creating Greetings table:', err.message);
        } else {
            console.log('Greetings table created or already exists.');
        }
    });
});