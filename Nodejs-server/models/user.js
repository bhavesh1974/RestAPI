const config = require("../config/config");

if (config.applicationDatabase == "MYSQL") {
  module.exports = require("../models/mysql/user");
} else {
  module.exports = require("../models/mongo/user");
}
