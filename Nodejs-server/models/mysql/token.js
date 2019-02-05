const db = require("../../config/mysql");

module.exports = class Token {
  constructor(userId, token) {
    this.userId = userId;
    this.token = token;
  }

  executeQuery(sql, data) {
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const resultData = result[0];
          if (resultData) {
            if (resultData.hasOwnProperty("affectedRows")) {
              resolve(resultData);
            } else {
              const token = new Token(resultData.userId, resultData.token);
              resolve(token);
            }
          } else {
            resolve(resultData);
          }
        }
      });
    });
  }

  async save() {
    let sql;
    const existingToken = await this.findByToken(this.token);
    if (existingToken) {
      sql = "UPDATE tokens set token = ? WHERE userId = ?";
    } else {
      sql = "INSERT INTO tokens (token, userId) VALUES (?,?)";
    }
    const data = [this.token, this.userId];
    return this.executeQuery(sql, data);
  }

  findByUserId(id) {
    const sql = "SELECT * from tokens where userId=?";
    const data = [id];
    return this.executeQuery(sql, data);
  }

  findByToken(token) {
    const sql = "SELECT * from tokens where token=?";
    const data = [token];
    return this.executeQuery(sql, data);
  }
};
