const config = require("../config/config");

if (config.applicationDatabase == "MYSQL") {
  module.exports = require("./mysql/customers");
} else {
  module.exports = "";
}
