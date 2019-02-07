const db = require("../../config/mongo");
const SalesSchema = require("././salesSchema");

module.exports = class Sales {
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
    if (this.id != undefined && this.id != "") {
      return new Promise((resolve, reject) => {
        SalesSchema.findOneAndUpdate(
          { _id: this.id },
          {
            salesDate: this.salesDate,
            customer: this.customer,
            item: this.item,
            qty: this.qty,
            rate: this.rate,
            taxPercent: this.taxPercent
          },
          function(error) {
            if (error) {
              console.log(error);
              reject(error);
            }
            resolve("Success");
          }
        );
      });
    } else {
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
  }

  findAll() {
    return new Promise((resolve, reject) => {
      SalesSchema.find()
        .exec()
        .then(data => {
          let sales = [];
          for (let i = 0; i < data.length; i++) {
            sales[i] = this.mapDataToModel(data[i]);
          }
          resolve(sales);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      SalesSchema.find({ _id: id })
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

  delete(id) {
    return new Promise((resolve, reject) => {
      SalesSchema.remove({ _id: id })
        .exec()
        .then(data => {
          resolve("Success");
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
