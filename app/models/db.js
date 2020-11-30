const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database LOCALLLLL
/*const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port:dbConfig.PORT
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});*/


//HEROKU
// Create a connection to the database
const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
connection.query('select 1 + 1', (err, rows) => { /* */ })



module.exports = connection;