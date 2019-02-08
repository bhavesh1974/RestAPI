const db = require("../../config/mysql");
const util = require("../../services/util");

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

  executeQuery(sql, data) {
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(error);
        } else {
          let resultData;
          if (result.length == 1) {
            resultData = result[0];
            if (resultData) {
              if (resultData.hasOwnProperty("affectedRows")) {
                resolve(resultData);
                return;
              } else {
                const sales = this.mapDataToModel(resultData);
                resolve(sales);
                return;
              }
            }
          }

          resultData = result;
          if (resultData) {
            let sales = [];
            for (let resultRecord in resultData) {
              sales[resultRecord] = this.mapDataToModel(
                resultData[resultRecord]
              );
            }
            resolve(sales);
          }
        }
      });
    });
  }

  mapDataToModel(data) {
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
    let sql = "";
    if (this.id != undefined && this.id != "") {
      sql =
        "UPDATE sales SET salesDate = ?, customer = ?, item = ?, qty = ?, rate = ?, taxPercent = ?, remark = ? where id = ?";
    } else {
      this.id = util.generateId();
      sql =
        "INSERT INTO sales (salesDate, customer, item, qty, rate, taxPercent, remark,id) VALUES (?,?,?,?,?,?,?,?)";
    }
    const data = [
      this.salesDate,
      this.customer,
      this.item,
      this.qty,
      this.rate,
      this.taxPercent,
      this.remark,
      this.id
    ];
    return this.executeQuery(sql, data);
  }

  delete(id) {
    const sql = "delete from sales where id = ?";
    const data = [id];
    return this.executeQuery(sql, data);
  }

  findAll() {
    const sql = "SELECT * from sales";
    return this.executeQuery(sql, null);
  }

  findById(id) {
    const sql = "SELECT * from sales where id=?";
    const data = [id];
    return this.executeQuery(sql, data);
  }
};
