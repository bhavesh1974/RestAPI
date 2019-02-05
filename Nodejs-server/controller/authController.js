const config = require("../config/config");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");

exports.signin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let message = "";
      for (let i = 0; i < errors.array().length; i++) {
        message = message + errors.array()[i].msg + " ";
      }
      let error = new Error(message);
      error.status = 202;
      throw error;
    }

    const email = req.body.email,
      password = req.body.password;

    let user = new User();
    user = await user.findByEmail(email);
    if (!user) {
      logger.warn("User not found");
      let error = new Error("A user with this email could not be found.");
      error.status = 400;
      throw error;
    }

    if (!user.isVerified) {
      let error = new Error(`Your account is not verified!`);
      error.status = 400;
      throw error;
    }

    if (!user.isActive) {
      let error = new Error(
        `Your account is deactivated. Please contact support for more information.`
      );
      error.status = 400;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      let error = new Error(`Password is incorrect`);
      error.status = 400;
      throw error;
    }

    const generatedToken = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      config.JWT.JWT_ENCRYPTION,
      {
        expiresIn: config.JWT.JWT_EXPIRATION
      }
    );

    res.cookie("SESSIONID", generatedToken, {
      httpOnly: true,
      secure: true
    });

    token = new Token(user.id, generatedToken);
    token.save();

    res.status(200).json({
      code: 200,
      token: generatedToken,
      userName: user.firstName
    });
  } catch (error) {
    console.log(error);
    logger.error("User login error ", error);
    next(error);
  }
};

exports.confirmation = async (req, res, next) => {
  try {
    logger.info("In Confirmation token ");
    const tokenValue = req.params.token;
    let user = new User();
    user = await user.findByToken(tokenValue);
    if (!user) {
      let error = new Error("A token is not found.");
      error.status = 400;
      throw error;
    }
    if (user.isVerified) {
      res.send(`Your account is already verified. Please login now.`);
    }
    await user
      .updateVerification(user.id)
      .then(() => {
        res.send("Your account is verified. Please login now.");
      })
      .catch(error => {
        logger.error("Token Verification Error ", error);
        throw error;
      });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  logger.info("Request for forgot password");

  const email = req.body.email;
};
