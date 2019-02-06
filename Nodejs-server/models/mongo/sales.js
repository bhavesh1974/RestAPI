const db = require("../../config/mongo");
const SalesSchema = require("././salesSchema");

module.exports = class User {
  constructor(id, salesDate, customer, item, qty, rate, taxPercent, remark) {
    this.id = id;
    this.salesDate = salesDate;
    this.customer = customer;
    this.item = item;
    this.qty = qty;
    this.rate = rate;
    this.taxPercent = taxPercent;
    this.remark = remark;
  }

  mapDataToModel(data) {
    if (!data) return null;

    const sales = new Sales(
      data.id,
      data.salesDate,
      data.customer,
      data.item,
      data.qty,
      data.rate,
      data.taxPercent,
      data.remark
    );
    return sales;
  }

  save() {
    var newSales = SalesSchema({
      id: this.id,
      salesDate: this.salesDate,
      customer: this.customer,
      item: this.item,
      qty: this.qty,
      rate: this.rate,
      taxPercent: this.taxPercent,
      remark: this.remark
    });

    return newSales.save();
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      SalesSchema.find({ id: id })
        .exec()
        .then(data => {
          const sales = this.mapDataToModel(data[0]);
          resolve(sales);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
