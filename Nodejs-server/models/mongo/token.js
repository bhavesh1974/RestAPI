const db = require("../../config/mongo");
const TokenSchema = require("./tokenSchema");

module.exports = class User {
  constructor(userId, token) {
    this.userId = userId;
    this.token = token;
  }

  mapDataToModel(data) {
    if (!data) return null;

    const token = new User(data.userId, data.token);
    return token;
  }

  async save() {
    const existingToken = await this.findById(this.id);

    if (existingToken) {
      return this.updateToken();
    } else {
      var newToken = TokenSchema({
        userId: this.userId,
        token: this.token
      });

      return newToken.save();
    }
  }

  updateToken() {
    return new Promise((resolve, reject) => {
      TokenSchema.findOneAndUpdate(
        { userId: this.userId },
        {
          token: this.token
        },
        function(error, user) {
          if (error) {
            reject(error);
          }
          resolve("Success");
        }
      );
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      TokenSchema.find({ userId: id })
        .exec()
        .then(data => {
          const token = this.mapDataToModel(data[0]);
          resolve(token);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  findByToken(token) {
    return new Promise((resolve, reject) => {
      TokenSchema.find({ token: token })
        .exec()
        .then(data => {
          const token = this.mapDataToModel(data[0]);
          resolve(token);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
