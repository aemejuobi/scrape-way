// Define required packages
require("dotenv").config();
const express = require("express");
const exhb = require("express-handlebars");
const port = process.env.PORT || 8080;
const app = express();
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const logger = require("morgan");

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Connect to mongo DB
mongoose.createConnection("mongodb://localhost:27017/scraperDB", {useNewUrlParser: true});

// Handlebars
app.engine("handlebars", exhb({defaultLayout: "main"}));
app.set("view engine", "handlebars");

apiRoutes(app);
htmlRoutes(app);

// Start server
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});