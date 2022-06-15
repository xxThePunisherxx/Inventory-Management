const express = require("express");
const app = express();
const ItemModel = require("./models/items");
const mongoose = require("mongoose");

const hbs = require("hbs");
const staticPath = __dirname + "/public";

//milldeware
app.use("/public", express.static(staticPath));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//partials
hbs.registerPartials("./views/partials");

//view engine configuration
app.set("view engine", "hbs");

// database connection
const dbUrl = "mongodb+srv://nikeshInventoryManagement:HT*cZU5WKG8LEyD@cluster0.2ipv9.mongodb.net/Inventory-management";
// const dbUrl = "mongodb://localhost:27017/Inven";
mongoose
	.connect(dbUrl)
	.then((result) => app.listen(3000))
	.catch((error) => console.error("can't connect to Mongoose server at dbUrl " + error.message));

app.get("/", async (req, res) => {
	try {
		let items = await ItemModel.find();
		res.render("index", { items });
	} catch (error) {
		console.log(error);
	}
});

app.get("/add", (req, res) => {
	res.render("add");
});
app.get("/remove", (req, res) => {
	res.render("remove");
});
app.post("/add", async (req, res) => {
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
});
app.post("/remove", async (req, res) => {
	let code = req.body.icode;
	let item = await ItemModel.findOne({ code });
	if (!item) {
		res.send("No item found");
	}
	ItemModel.deleteOne({ itemCode: code }).then((data) => {
		res.render("deletedSucces");
	});
});
app.get("/update", (req, res) => {
	// res.render("update");
	res.render("workingonit");
});
app.post("/remove/:ItemCode", async (req, res) => {
	let { ItemCode } = req.params;
	let item = await ItemModel.findOne({ itemCode: ItemCode });
	try {
		let result = await ItemModel.findByIdAndDelete(item.id);
	} catch (error) {
		console.log(error);
	}
	res.redirect("/");
});
app.get("/update/:ItemCode", async (req, res) => {
	let { ItemCode } = req.params;
	try {
		let item = await ItemModel.findOne({ itemCode: ItemCode });
		res.render("update", { item });
	} catch (error) {
		console.log(error);
	}
});
app.post("/update/:ItemCode", async (req, res) => {
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
});

app.get("*", (req, res) => {
	res.sendStatus(404);
});
