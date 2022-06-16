require("dotenv").config();
const express = require("express");
const app = express();
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
	.then((result) => app.listen(3000))
	.then(console.log("server running at port 3000"))
	.catch((error) => console.error("can't connect to Mongoose server at dbUrl " + error.message));

//controllers
const allItems = require("./controllers/items");
// routers
const removeRouter = require("./routes/remove");
const addRouter = require("./routes/add");
const updateRouter = require("./routes/update");

app.get("/", allItems); //main page
app.use("/add", addRouter); //add item
app.use("/remove", removeRouter); //remove item
app.use("/update", updateRouter); //update items
app.get("*", (req, res) => {
	res.sendStatus(404);
});

//TODO:
// 1. Add authentication for add , remove and update functions
//2. add update using itemcode
