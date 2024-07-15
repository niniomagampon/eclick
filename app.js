const express = require("express");
const ejs = require("ejs");
const cartRoute = require("./routes/cart");
const productsRoute = require("./routes/products");
const customerRoute = require("./routes/customer");
const session = require("express-session");

// Database
const db = require("./configs/database");
const adminRoute = require("./routes/admin");
const { AUTH } = require("./middleware/auth");

// Test DB
db.authenticate()
	.then(() => console.log("Database connected..."))
	.catch((err) => console.log("Error: " + err));

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
	session({
		secret: "my secret",
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false },
	})
);

// Database Connection

// Route
// Login Route
app.use("/", customerRoute);

app.use("/cart", cartRoute);

app.use("/products", productsRoute);

app.use("/admin", AUTH, adminRoute);

// Server Starter
app.listen(port, async () => {
	await db.sync();
	console.log(`Server Started on port : ${port}`);
});
