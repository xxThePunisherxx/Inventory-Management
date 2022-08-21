const ItemModel = require("../models/items");
const updatePage = (req, res) => {
	res.render("updateCode");
};
const getUpdateFromMain = async (req, res) => {
	let { ItemCode } = req.params;
	try {
		let item = await ItemModel.findOne({ itemCode: ItemCode });
		res.render("update", { item });
	} catch (error) {
		console.log(error);
	}
};
const postUpdateToDB = async (req, res) => {
	let { ItemCode } = req.params;
	let item = await ItemModel.findOne({ itemCode: ItemCode });
	try {
		let result = ItemModel.findByIdAndUpdate(
			{ _id: item.id },
			{
				itemCode: req.body.icode,
				itemName: req.body.iname,
				image: req.body.iimg,
				category: req.body.icat,
				onhand: req.body.ioh,
			},
			function (err, result) {
				if (err) res.send("Error");
				else {
					res.redirect("/");
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { updatePage, getUpdateFromMain, postUpdateToDB };
