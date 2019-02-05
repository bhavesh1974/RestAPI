var mongoose = require("mongoose");
const config = require("./config");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://" + config.mongo.host + "/" + config.mongo.database,
  {
    //useMongoClient: true
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
