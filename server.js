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

	// console.log(" request body", req.body);
	// let { icode, iname, iimg, icat, ioh } = req.body;
	// // // console.log(ItemName);
	// // console.log(req.body.icat);
	// // console.log("Item category" + ItemCategory);
	// // const data = new ItemModel({ ItemCode, ItemName, ItemImage, ItemCategory, ItemOnHand });
	// // let iCode = req.body.icode;
	// // let iName = req.body.iname;
	// // let iImg = req.body.iimg;
	// // let iCat = req.body.icat;
	// // let iOh = req.body.ioh;

	// const data = new ItemModel({ itemCode: icode, itemName: iname, image: iimg, category: icat, onhand: ioh });
	// try {
	// 	await data.save();
	// } catch (err) {
	// 	console.log(err);
	// }
	// // console.log("data " + data);
	// // console.log(data);

	// // // console.log(icode, iname, icat, ioh);
	// // // const itemdata = new Item({ icode: ItemCode, iname: ItemName, iimg: Image, icat: Category, ioh: Onhand });
	// // // try {
	// // // 	await itemdata.save();
	// // // } catch (error) {
	// // // 	console.log(error.message);
	// // // }
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
app.get("/dashboard", (req, res) => {
	res.render("workingonit");
});
app.get("/update", (req, res) => {
	res.render("workingonit");
});

app.get("*", (req, res) => {
	res.sendStatus(404);
});
//TODO:
//  1. add update page
// 2. implement update api
// 3. add dashboad page
//4. add paginations
