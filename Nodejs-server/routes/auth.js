const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");

const authController = require("../controller/authController");

router.post(
  "/signin",
  [
    check("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is not valid."),
    check("password")
      .isLength({
        min: 3
      })
      .withMessage("Password is not valid.")
  ],
  authController.signin
);

router.get("/confirmation/:token", authController.confirmation);

router.post("forgotPassword", authController.forgotPassword);

module.exports = router;
