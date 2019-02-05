const User = require("../models/user");
const { validationResult } = require("express-validator/check");
const uploadImage = require("../services/fileupload");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const util = require("../services/util");
const mailer = require("../services/mailer");

let generatedId = util.generateId();
let createdAt = util.currentDateTime();

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error(errors.array());
      error.status = 202;
      throw error;
    }

    const firstName = req.body.firstName,
      lastName = req.body.lastName,
      email = req.body.email,
      password = req.body.password,
      hashedPw = await bcrypt.hash(password, 12),
      phone = req.body.phone;

    let user = new User();
    userData = await user.findByEmail(email);
    if (userData) {
      let error = new Error(`A user with this email is already registered.`);
      error.status = 400;
      throw error;
    }

    const userId = generatedId;
    // user.id = generatedId;
    // user.firstName = firstName;
    // user.lastName = lastName;
    // user.email = email;
    // user.password = hashedPw;
    // user.phone = phone;
    // user.createdAt = createdAt;

    const newToken = crypto.randomBytes(16).toString("hex");
    let saveUser = new User(
      userId,
      firstName,
      lastName,
      email,
      hashedPw,
      phone,
      null,
      createdAt,
      0,
      1,
      newToken
    );
    await saveUser
      .save()
      .then(() => {
        const data = {
          name: firstName + " " + lastName,
          email: email,
          host: req.headers.host,
          token: newToken
        };
        mailer.sendEmail(data);
        res.status(200).json({
          code: 200,
          message: `${firstName}, a verification link has been sent at ${email}.`
        });
      })
      .catch(error => {
        logger.error("Save user error", error);
        throw error;
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    let user = new User();
    user = await user.findById(req.userId);
    if (!user) {
      let error = new Error("User not found");
      error.status = 400;
      throw error;
    } else {
      res.json({
        code: 200,
        data: user
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error(errors.array());
    error.status = 202;
    return next(error);
  }

  try {
    let user = new User();
    user = await user.findById(req.userId);
    if (!user) {
      let error = new Error("User not found");
      error.status = 400;
      throw error;
    }

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    await user
      .updateProfile()
      .then(() => {
        res.status(200).json({
          code: 200,
          message: "Profile is updated successfully."
        });
      })
      .catch(error => {
        logger.error("User profile update Error ", error);
        throw error;
      });
  } catch (error) {
    next(error);
  }
};

exports.updatePicture = async (req, res, next) => {
  let id = req.userId;
  let user = new User();
  try {
    user = await user.findById(id);
    if (user) {
      uploadImage.storeImage(req, res, function(err) {
        if (err) {
          let error = new Error("An Error occurred! ", err);
          error.status = 400;
          throw error;
        }

        user.picture = req.files[0].filename;
        console.log("test");
        user.updatePicture();

        return res.send({
          message:
            "Upload to '" + req.files[0].destination + "' was successful!"
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getPicture = async (req, res, next) => {
  let id = req.userId;
  try {
    let user = new User();
    user = await user.findById(id);
    if (user) {
      if (user.picture && user.picture.length > 0) {
        res.sendFile(__basedir + "/uploads/" + user.picture);
      } else {
        let error = new Error("No picture uploaded");
        error.status = 400;
        throw error;
      }
    } else {
      let error = new Error(`No user found`);
      error.status = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  let id = req.userId;

  try {
    let user = new User();
    user = await user.findById(id);
    if (user) {
      const oldPassword = req.body.oldpassword;
      const newPassword = req.body.password;

      const isEqual = await bcrypt.compare(oldPassword, user.password);
      if (!isEqual) {
        let error = new Error(`Password is incorrect`);
        error.status = 400;
        throw error;
      }

      hashedPw = await bcrypt.hash(newPassword, 12);
      user.password = hashedPw;
      user
        .updatePassword()
        .then(data =>
          res.status(200).json({
            message: "Password changed successfully."
          })
        )
        .catch(error => {
          logger.error("Change password error", error);
          throw error;
        });
    }
  } catch (error) {
    next(error);
  }
};
