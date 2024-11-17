const db = require('./db');

db.all('SELECT * FROM Greetings', [], (err, rows) => {
    if (err) {
        console.error('Error querying the database:', err.message);
    } else {
        console.log('Seeded Greetings:', rows);
    }
    db.close();
});
