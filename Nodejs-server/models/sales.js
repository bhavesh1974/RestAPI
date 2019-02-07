const config = require("../config/config");

if (config.applicationDatabase == "MYSQL") {
  module.exports = require("../models/mysql/sales");
} else {
  module.exports = require("../models/mongo/sales");
}
