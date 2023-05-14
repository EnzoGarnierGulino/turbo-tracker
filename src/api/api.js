const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('src/database/TurboTracker.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the database.');
    }
});

// db.run("CREATE TABLE IF NOT EXISTS logs (total_members INTEGER, total_connected INTEGER, messages_in_channel INTEGER, msg_per_hour INTEGER)");
// db.run("INSERT INTO logs (total_members, total_connected, messages_in_channel, msg_per_hour) VALUES (?, ?, ?, ?)", [100, 80, 500, 100]);
// db.run("DELETE FROM logs");

// db.all("SELECT * FROM logs", (err, rows) => {
//     if (err) {
//         throw err;
//     }
//     rows.forEach(row => {
//         console.log(row);
//     });
// });

export function getTotalMembers() {
    return new Promise((resolve, reject) => {
        db.all("SELECT total_members FROM logs", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

getTotalMembers()
    .then(rows => {
        rows.forEach(row => {
            return row.total_members;
        });
    })
    .catch(err => {
        console.error("Une erreur s'est produite : " + err);
    });

function getTotalConnectedMembers() {
    return new Promise((resolve, reject) => {
        db.all("SELECT total_connected FROM logs", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

getTotalConnectedMembers()
    .then(rows => {
        rows.forEach(row => {
            return row.total_connected;
        });
    })
    .catch(err => {
        console.error("Une erreur s'est produite : " + err);
    });

function getNumberOfMessagesInChannel() {
    return new Promise((resolve, reject) => {
        db.all("SELECT msg_per_hour FROM logs", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

getNumberOfMessagesInChannel()
    .then(rows => {
        rows.forEach(row => {
            return row.messages_in_channel;
        });
    })
    .catch(err => {
        console.error("Une erreur s'est produite : " + err);
    });

function getMessagesPerHour() {
    return new Promise((resolve, reject) => {
        db.all("SELECT msg_per_hour FROM logs", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

getMessagesPerHour()
    .then(rows => {
        rows.forEach(row => {
            return row.msg_per_hour;
        });
    })
    .catch(err => {
        console.error("Une erreur s'est produite : " + err);
    });