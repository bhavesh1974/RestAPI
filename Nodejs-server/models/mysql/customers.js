const db = require("../../config/mysql");

module.exports = class Customer {
  constructor(id, customerCode, customerName, address, city, state, phone) {
    this.id = id;
    this.customerCode = customerCode;
    this.customerName = customerName;
    this.address = address;
    this.city = city;
    this.state = state;
    this.phone = phone;
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
                const customer = this.mapDataToModel(resultData);
                resolve(customer);
                return;
              }
            }
          }

          resultData = result;
          if (resultData) {
            let customers = [];
            for (let resultRecord in resultData) {
              customers[resultRecord] = this.mapDataToModel(
                resultData[resultRecord]
              );
            }
            resolve(customers);
          }
        }
      });
    });
  }

  mapDataToModel(data) {
    const customer = new Customer(
      data.id,
      data.customerCode,
      data.customerName,
      data.address,
      data.city,
      data.state,
      data.phone
    );
    return customer;
  }

  save() {
    let sql = "";
    if (this.id != null && this.id != undefined) {
      sql =
        "update customers set customercode = ?, customername = ?, address=?, city=?,state=?, phone=? where id = ?";
    } else {
      sql =
        "insert into customers(customercode, customername, address, city, state, phone, id) values (?,?,?,?,?,?,?)";
    }

    const data = [
      this.customerCode,
      this.customerName,
      this.address,
      this.city,
      this.state,
      this.phone,
      this.id
    ];

    return this.executeQuery(sql, data);
  }

  delete(id) {
    const sql = "delete from customers where id = ?";
    const data = [id];
    return this.executeQuery(sql, data);
  }

  findAll() {
    const sql = "select * from customers";
    return this.executeQuery(sql, null);
  }

  find(id) {
    const sql = "select * from customers where id = ?";
    const data = [id];
    return this.executeQuery(sql, data);
  }
};
