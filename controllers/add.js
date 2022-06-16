const ItemModel = require("../models/items");
const addPage = (req, res) => {
	res.render("add");
};

const addFunction = async (req, res) => {
	try {
		await ItemModel.create({
			itemCode: req.body.icode,
			itemName: req.body.iname,
			image: req.body.iimg,
			category: req.body.icat,
			onhand: req.body.ioh,
		});
		res.render("added");
	} catch (err) {
		res.send("someting went wrong");
		console.log("cant add item try again at later time");
	}
};

module.exports = { addPage, addFunction };
