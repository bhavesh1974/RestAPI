const db = require("../../config/mongo");
const UserSchema = require("./userSchema");

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

  mapDataToModel(data) {
    if (!data) return null;

    const user = new User(
      data.id,
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.phone,
      data.picture,
      data.createdAt,
      data.isVerified,
      data.isActive,
      data.verificationToken
    );
    return user;
  }

  save() {
    var newUser = UserSchema({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password,
      picture: "",
      isVerified: 1,
      isActive: 1,
      verificationToken: this.verificationToken
    });

    return newUser.save();
  }

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      UserSchema.find({ email: email })
        .exec()
        .then(data => {
          const user = this.mapDataToModel(data[0]);
          resolve(user);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      UserSchema.find({ id: id })
        .exec()
        .then(data => {
          const user = this.mapDataToModel(data[0]);
          resolve(user);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  findByToken(token) {
    return new Promise((resolve, reject) => {
      UserSchema.find({ verificationToken: token })
        .exec()
        .then(data => {
          const user = this.mapDataToModel(data[0]);
          resolve(user);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updateVerification(id) {
    return new Promise((resolve, reject) => {
      UserSchema.findOneAndUpdate({ id: id }, { isVerified: 1 }, function(
        error,
        user
      ) {
        if (error) {
          reject(error);
        }
        resolve("Success");
      });
    });
  }

  updateProfile() {
    return new Promise((resolve, reject) => {
      UserSchema.findOneAndUpdate(
        { id: this.id },
        {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone
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

  updatePicture() {
    return new Promise((resolve, reject) => {
      UserSchema.findOneAndUpdate(
        { id: this.id },
        { picture: this.picture },
        function(error, user) {
          if (error) {
            reject(error);
          }
          resolve("Success");
        }
      );
    });
  }

  updatePassword() {
    return new Promise((resolve, reject) => {
      UserSchema.findOneAndUpdate(
        { id: this.id },
        { password: this.password },
        function(error, user) {
          if (error) {
            reject(error);
          }
          resolve("Success");
        }
      );
    });
  }
};
