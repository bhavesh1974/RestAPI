var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  picture: String,
  isVerified: Number,
  isActive: Number,
  verificationToken: String
});

var User = mongoose.model("users", userSchema);

module.exports = User;
