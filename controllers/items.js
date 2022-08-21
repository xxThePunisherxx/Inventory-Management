const ItemModel = require("../models/items");
const allItems = async (req, res) => {
	try {
		let items = await ItemModel.find();
		res.render("index", { items });
	} catch (error) {
		console.log(error);
	}
};
const individualitems = async (req, res) => {
	let { itemCode } = req.params;
	let individualitems = await ItemModel.findOne({ itemCode: itemCode });
	res.render("individualpage", { individualitems });
};
module.exports = { allItems, individualitems };
