var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var salesSchema = new Schema({
  salesDate: Date,
  customer: String,
  item: String,
  qty: Number,
  rate: Number,
  taxPercent: Number,
  remark: String
});

var Sales = mongoose.model("sales", salesSchema);

module.exports = Sales;
