const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const DBSOURCE = './usersdb.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        var salt = bcrypt.genSaltSync(10);

        db.run(
            `CREATE TABLE Users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Username text,
            Email text,
            Password text,
            Salt text,
            Token text,
            DateLoggedIn DATE,
            DateCreated DATE
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows

                    var insert =
                        'INSERT INTO Users (Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)';
                    db.run(insert, [
                        'user1',
                        'user1@example.com',
                        bcrypt.hashSync('user1', salt),
                        salt,
                        Date('now'),
                    ]);
                    db.run(insert, [
                        'user2',
                        'user2@example.com',
                        bcrypt.hashSync('user2', salt),
                        salt,
                        Date('now'),
                    ]);
                    db.run(insert, [
                        'user3',
                        'user3@example.com',
                        bcrypt.hashSync('user3', salt),
                        salt,
                        Date('now'),
                    ]);
                    db.run(insert, [
                        'user4',
                        'user4@example.com',
                        bcrypt.hashSync('user4', salt),
                        salt,
                        Date('now'),
                    ]);
                }
            }
        );
    }
});

module.exports = db;