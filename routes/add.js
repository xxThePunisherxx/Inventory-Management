const express = require("express");
const router = express.Router();
const { addPage, addFunction } = require("../controllers/add");

router.get("/", addPage);
router.post("/", addFunction);
module.exports = router;
