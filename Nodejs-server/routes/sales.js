const express = require("express");
const router = express.Router();
const salesController = require("../controller/salesController");

router.get("/", salesController.getAll);
router.post("/", salesController.save);
router.delete("/:id", salesController.delete);
module.exports = router;
