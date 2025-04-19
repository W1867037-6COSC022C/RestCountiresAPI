import "dotenv/config";
import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();
const dbPath = process.env.DB_PATH;

if (!dbPath) {
  console.log("DB_PATH is undefined.");
  process.exit(1);
}

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.log("Connection to db failed:" + err);
  } else {
    console.log("database connection successful.");
  }
});

const userRoles_sql = `CREATE TABLE IF NOT EXISTS RC_UserRole (
      id INTEGER PRIMARY KEY,
      role TEXT NOT NULL
    )`;

const rc_users_sql = `CREATE TABLE IF NOT EXISTS RC_Users (
      userId INTEGER PRIMARY KEY AUTOINCREMENT,
      userName TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email TEXT NOT NULL,
      roleId INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

const rc_user_api_sql = `CREATE TABLE IF NOT EXISTS RC_UsersAPI (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      api_key TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1,
      usage_count INTEGER NOT NULL DEFAULT 0,
      last_used DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES RC_Users(userId)
    )`;

db.run(userRoles_sql, (err) => {
  if (err) {
    console.error("Error creating 'RC_UserRole' table:", err);
  } else {
    console.log("'RC_UserRole' table created");
  }
});

db.run(rc_users_sql, (err) => {
  if (err) {
    console.error("Error creating 'RC_Users' table:", err);
  } else {
    console.log("'RC_Users' table created");
  }
});

db.run(rc_user_api_sql, (err) => {
  if (err) {
    console.error("Error creating 'RC_UsersAPI' table:", err);
  } else {
    console.log("'RC_UsersAPI' table created");
  }
});

// db.run(`INSERT INTO RC_UserRole VALUES (1, 'Admin'), (2, 'User')`, (err) => {
//   if (err) {
//     console.error("INSERT FAILED: " + err);
//   } else {
//     console.log("Wrote to RC_UserRole");
//   }
// });

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export default {
  db,
  run,
  get,
  all,
};
