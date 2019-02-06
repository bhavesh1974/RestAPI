const express = require("express");
const router = express.Router();
const salesController = require("../controller/salesController");

router.get("/getAll", salesController.getAll);
router.post("/save", salesController.save);
router.delete("/delete/:id", salesController.delete);
module.exports = router;
