const ItemModel = require("../models/items");
const allItems = async (req, res) => {
	try {
		let items = await ItemModel.find();
		res.render("index", { items });
	} catch (error) {
		console.log(error);
	}
};
module.exports = allItems;
