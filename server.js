// Define required packages
require("dotenv").config();
const express = require("express");
const exhb = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const port = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Connect to mongo DB
mongoose.connect(MONGODB_URI);

// Handlebars
app.engine("handlebars", exhb({defaultLayout: "main"}));
app.set("view engine", "handlebars");

apiRoutes(app);
htmlRoutes(app);

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});