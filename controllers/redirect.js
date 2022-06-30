const ItemModel = require("../models/items");

const redirect = (req, res) => {
	console.log(req.body.icode);
	res.redirect(`/update/${req.body.icode}`);
};
module.exports = redirect;
