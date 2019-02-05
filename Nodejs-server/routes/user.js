const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");

const userController = require("../controller/userController");
const isAuth = require("../middleware/is-auth");

router.post(
  "/signup",
  [
    check("firstName")
      .isLength({
        min: 2
      })
      .trim()
      .escape()
      .withMessage("Name Must be at least 2 chars long"),
    check("lastName")
      .isLength({
        min: 2
      })
      .trim()
      .escape()
      .withMessage("Name Must be at least 2 chars long"),
    check("phone")
      .isLength({
        min: 7
      })
      .trim()
      .escape()
      .withMessage("Phone has minimum 7 character"),
    check("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Enter Valid Email Id"),
    check("password")
      .isLength({
        min: 3
      })
      .withMessage("Password Must be at least 3 chars long")
  ],
  userController.signup
);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags:
 *       - users
 *     description: Returns current logged in user's profile
 *     parameters:
 *       - name: Authorization
 *         description: JWT Token
 *         in: header
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns users JSON object
 */
router.get("/profile", isAuth, userController.getUserProfile);

/**
 * @swagger
 * /user/updateProfile:
 *   put:
 *     tags:
 *       - User
 *     description: Update user profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT Token
 *         in: header
 *         required: true
 *         type: string
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *            properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.put(
  "/updateProfile",
  isAuth,
  [
    check("firstName")
      .isLength({
        min: 2
      })
      .trim()
      .escape()
      .withMessage("Name Must be at least 2 chars long"),
    check("lastName")
      .isLength({
        min: 2
      })
      .trim()
      .escape()
      .withMessage("Name Must be at least 2 chars long"),
    check("phone")
      .isLength({
        min: 7
      })
      .trim()
      .escape()
      .withMessage("Phone has minimum 7 character")
  ],
  userController.updateProfile
);

router.put("/updatePicture", isAuth, userController.updatePicture);
router.post("/uploadPicture", isAuth, userController.updatePicture);
router.get("/getPicture", isAuth, userController.getPicture);
router.post("/changePassword", isAuth, userController.changePassword);
module.exports = router;
