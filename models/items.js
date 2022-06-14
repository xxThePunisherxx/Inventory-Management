const mongoose = require("mongoose");
const validator = require("validator");

const itemSchema = new mongoose.Schema({
	itemCode: {
		type: String,
		required: true,
		unique: true,
	},
	itemName: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	onhand: {
		type: String,
		required: true,
	},
});

const Item = new mongoose.model("Item", itemSchema);
module.exports = Item;
