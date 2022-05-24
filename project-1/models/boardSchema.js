const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./kanban_boards.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        db.run(
            'CREATE TABLE boards( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            stage INTEGER NOT NULL,\
            title NVARCHAR(100) NOT NULL\
        )',
            (err) => {
                if (err) {
                    console.log('Table boards already exists.');
                    return;
                }
                console.log('Created boards table succesfully.');
            }
        );
    }
});

module.exports = db;