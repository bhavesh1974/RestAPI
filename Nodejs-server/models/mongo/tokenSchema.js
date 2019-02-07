var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
  userId: String,
  token: String
});

var Token = mongoose.model("tokens", tokenSchema);

module.exports = Token;
