const express = require("express");
const router = express.Router();

const { updatePage, getUpdateFromMain, postUpdateToDB } = require("../controllers/update");

router.get("/", updatePage);
router.post("/getcode");
router.get("/:ItemCode", getUpdateFromMain);
router.post("/:ItemCode", postUpdateToDB);
module.exports = router;
