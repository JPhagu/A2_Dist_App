const db = require('./db');

// Seed data with distinct formal and casual tones for each greeting
const seedGreetings = [
    // English Greetings
    { timeOfDay: 'Morning', language: 'English', greetingMessage: 'Good Morning', tone: 'Formal' },
    { timeOfDay: 'Morning', language: 'English', greetingMessage: 'Hey, Morning!', tone: 'Casual' },
    { timeOfDay: 'Afternoon', language: 'English', greetingMessage: 'Good Afternoon', tone: 'Formal' },
    { timeOfDay: 'Afternoon', language: 'English', greetingMessage: 'Hey, Good Afternoon!', tone: 'Casual' },
    { timeOfDay: 'Evening', language: 'English', greetingMessage: 'Good Evening', tone: 'Formal' },
    { timeOfDay: 'Evening', language: 'English', greetingMessage: 'Evening, how’s it going?', tone: 'Casual' },

    // French Greetings
    { timeOfDay: 'Morning', language: 'French', greetingMessage: 'Bonjour', tone: 'Formal' },
    { timeOfDay: 'Morning', language: 'French', greetingMessage: 'Salut, Bonjour!', tone: 'Casual' },
    { timeOfDay: 'Afternoon', language: 'French', greetingMessage: 'Bon Après-midi', tone: 'Formal' },
    { timeOfDay: 'Afternoon', language: 'French', greetingMessage: 'Salut, Bon Après-midi!', tone: 'Casual' },
    { timeOfDay: 'Evening', language: 'French', greetingMessage: 'Bonsoir', tone: 'Formal' },
    { timeOfDay: 'Evening', language: 'French', greetingMessage: 'Salut, Bonsoir!', tone: 'Casual' },

    // Spanish Greetings
    { timeOfDay: 'Morning', language: 'Spanish', greetingMessage: 'Buenos Días', tone: 'Formal' },
    { timeOfDay: 'Morning', language: 'Spanish', greetingMessage: '¡Hola, Buenos Días!', tone: 'Casual' },
    { timeOfDay: 'Afternoon', language: 'Spanish', greetingMessage: 'Buenas Tardes', tone: 'Formal' },
    { timeOfDay: 'Afternoon', language: 'Spanish', greetingMessage: '¡Qué tal! Buenas Tardes', tone: 'Casual' },
    { timeOfDay: 'Evening', language: 'Spanish', greetingMessage: 'Buenas Noches', tone: 'Formal' },
    { timeOfDay: 'Evening', language: 'Spanish', greetingMessage: '¡Buenas Noches, cómo va todo?', tone: 'Casual' },
];

// Insert seed data
db.serialize(() => {
    const stmt = db.prepare(`
        INSERT OR IGNORE INTO Greetings (timeOfDay, language, greetingMessage, tone)
        VALUES (?, ?, ?, ?)
    `);

    seedGreetings.forEach((greeting) => {
        stmt.run(greeting.timeOfDay, greeting.language, greeting.greetingMessage, greeting.tone);
    });

    stmt.finalize((err) => {
        if (err) {
            console.error('Error seeding database:', err.message);
        } else {
            console.log('Database seeded successfully.');
        }
    });

    db.close();
});
