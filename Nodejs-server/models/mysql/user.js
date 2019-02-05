const db = require("../../config/mysql");

module.exports = class User {
  constructor(
    id,
    firstName,
    lastName,
    email,
    password,
    phone,
    picture,
    createdAt,
    isVerified,
    isActive,
    verificationToken
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.picture = picture;
    this.createdAt = createdAt;
    this.isVerified = isVerified;
    this.isActive = isActive;
    this.verificationToken = verificationToken;
  }

  executeQuery(sql, data) {
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(error);
        } else {
          // logger.info("User query result ", result);
          const resultData = result[0];
          if (resultData) {
            if (resultData.hasOwnProperty("affectedRows")) {
              resolve(resultData);
            } else {
              const user = new User(
                resultData.id,
                resultData.firstName,
                resultData.lastName,
                resultData.email,
                resultData.password,
                resultData.phone,
                resultData.picture,
                resultData.createdAt,
                resultData.isVerified,
                resultData.isActive
              );
              resolve(user);
            }
          } else {
            resolve(resultData);
          }
        }
      });
    });
  }

  save() {
    const sql =
      "INSERT INTO users (id, firstName, lastName, email, password, phone, createdAt, verificationToken) VALUES (?,?,?,?,?,?,?,?)";
    const data = [
      this.id,
      this.firstName,
      this.lastName,
      this.email,
      this.password,
      this.phone,
      this.createdAt,
      this.verificationToken
    ];
    return this.executeQuery(sql, data);
  }

  findByEmail(email) {
    const sql = "SELECT * from users where email=?";
    const data = [email];
    return this.executeQuery(sql, data);
  }

  findById(id) {
    const sql = "SELECT * from users where id=?";
    const data = [id];
    return this.executeQuery(sql, data);
  }

  findByToken(token) {
    const sql = "SELECT * from users where verificationToken=?";
    const data = [token];
    return this.executeQuery(sql, data);
  }

  updateVerification(id) {
    const sql = "UPDATE users SET isVerified=1 where id=?";
    const data = [id];
    return this.executeQuery(sql, data);
  }

  updateProfile() {
    const sql = "UPDATE users SET firstName=?, lastName=?, phone=? WHERE id=?";
    const data = [this.firstName, this.lastName, this.phone, this.id];
    return this.executeQuery(sql, data);
  }

  updatePicture() {
    const sql = "UPDATE users SET picture=? WHERE id=?";
    const data = [this.picture, this.id];
    return this.executeQuery(sql, data);
  }

  updatePassword() {
    const sql = "UPDATE users SET password=? WHERE id=?";
    const data = [this.password, this.id];
    return this.executeQuery(sql, data);
  }
};
