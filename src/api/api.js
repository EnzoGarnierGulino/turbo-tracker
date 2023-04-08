const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('../database/TurboTracker.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the database.');
    }

});

db.run("CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)");

db.run("INSERT INTO test (name) VALUES (?)", "John");

db.all("SELECT * FROM test", (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach(row => {
        console.log(row.id, row.name);
    });
});

db.all("SELECT * FROM test", [], { headers: true }, (err, rows) => {
    if (err) {
        throw err;
    }
    console.table(rows);
});

db.close();

