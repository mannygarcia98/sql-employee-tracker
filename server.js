const db = require("./db/connection");

// db.connect();

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
});

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});