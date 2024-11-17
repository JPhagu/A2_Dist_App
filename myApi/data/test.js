const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.../myApi/greetings.db'); // Adjust the path as needed

// Function to run a query
const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Main function to execute
const main = async () => {
    try {
        const results = await runQuery('SELECT * FROM Greetings');
        console.log('Query Results:', results);
    } catch (error) {
        console.error('Error running query:', error);
    } finally {
        db.close(); // Close the database connection
    }
};

main();