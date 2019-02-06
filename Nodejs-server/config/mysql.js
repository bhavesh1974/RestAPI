const mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  dateStrings: "date"
});

connection.connect(function(error) {
  if (error) {
    logger.error("error connecting: " + error.stack);
    return;
  }
  logger.info("connected as id " + connection.threadId);
});

module.exports = connection;
