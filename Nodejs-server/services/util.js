var crypto = require("crypto");
var moment = require("moment");
var shortid = require("shortid");
const _uuid = require("uuid");

exports.generateId = function () {
  // return shortid.generate() + '' + shortid.generate();
  return _uuid.v4();
};

exports.currentDateTime = function () {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};

var algorithm = "aes-256-ctr",
  encryptKey = "123456",
  input_encoding = "utf8",
  output_encoding = "hex";

exports.encryptPassword = function (password) {
  var cipher = crypto.createCipher(algorithm, encryptKey);
  var crypted = cipher.update(password, input_encoding, output_encoding);
  crypted = crypted + cipher.final(output_encoding);
  return crypted;
};

exports.decryptPassword = function (password) {
  var decipher = crypto.createDecipher(algorithm, encryptKey);
  var dec = decipher.update(password, output_encoding, input_encoding);
  dec = dec + decipher.final(input_encoding);
  return dec;
};