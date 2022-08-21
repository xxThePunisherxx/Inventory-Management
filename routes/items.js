const express = require("express");
const router = express.Router();
const { allItems, individualitems } = require("../controllers/items");

router.get("/", allItems);
router.get("/details/:itemCode", individualitems);
module.exports = router;
