const ItemModel = require("../models/items");

const removePage = (req, res) => {
	res.render("remove");
};

const removeFunction = async (req, res) => {
	let code = req.body.icode;
	let item = await ItemModel.findOne({ code });
	if (!item) {
		res.send("No item found");
	}
	ItemModel.deleteOne({ itemCode: code }).then((data) => {
		res.render("deletedSucces");
	});
};
const removeFromMain = async (req, res) => {
	let { ItemCode } = req.params;
	let item = await ItemModel.findOne({ itemCode: ItemCode });
	try {
		let result = await ItemModel.findByIdAndDelete(item.id);
	} catch (error) {
		console.log(error);
	}

	res.redirect("/");
};

module.exports = { removePage, removeFunction, removeFromMain };
