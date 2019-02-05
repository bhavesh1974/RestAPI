const config = require("../config/config");

if (config.applicationDatabase == "MYSQL") {
  module.exports = require("../models/mysql/token");
} else {
  module.exports = require("../models/mongo/token");
}
