const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

router.get("/", customerController.getAll);
router.post("/", customerController.save);
router.delete("/:id", customerController.delete);

module.exports = router;
