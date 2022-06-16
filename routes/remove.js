const express = require("express");
const router = express.Router();

const { removePage, removeFunction, removeFromMain } = require("../controllers/remove");

router.get("/", removePage);
router.post("/", removeFunction);
router.post("/:ItemCode", removeFromMain);

module.exports = router;
