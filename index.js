require("dotenv").config();
const express = require("express");
const app = express();
let port = process.env.PORT || 6969;

const mongoose = require("mongoose");
const hbs = require("hbs");
const staticPath = __dirname + "/public"; //static files
app.use("/public", express.static(staticPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
hbs.registerPartials("./views/partials"); //partials
app.set("view engine", "hbs"); //view engine configuration
// database connection
const dbUrl = process.env.dburl;
mongoose
	.connect(dbUrl)
	.then(() => app.listen(port))
	.then(console.log("server running at port" + port))
	.catch((error) => console.error("can't connect to Mongoose server at dbUrl " + error.message));

//controllers
const allItems = require("./controllers/items");
// routers
const removeRouter = require("./routes/remove");
const addRouter = require("./routes/add");
const updateRouter = require("./routes/update");
const itemsRouter = require("./routes/items");
const redirectController = require("./controllers/redirect");
app.use("/", itemsRouter);
const ItemModel = require("./models/items");
app.post("/getcode", async (req, res) => {
	let raw_code = req.body.icode;
	let code = raw_code.replace(/\s+/g, "");
	console.log(code);
	let item = await ItemModel.findOne({ itemCode: code });
	console.log(item);
	if (!item) {
		res.render("Error");
	} else {
		var url = "/update/" + code;

		res.redirect(url);
	}
});
app.use("/add", addRouter); //add item
app.use("/remove", removeRouter); //remove item
app.use("/update", updateRouter); //update items
app.post("/redirectToUpdadte", redirectController);
app.get("*", (req, res) => {
	res.sendStatus(404);
});

//TODO:
// 1. implement error handling
