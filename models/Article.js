const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// Create connection
// mongoose.createConnection("mongodb://localhost:27017/scraperDB", {useNewUrlParser: true});

// Create a schema
const ArticleSchema = new Schema({
    // _id: ObjectId,
    title: String,
    link: String
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;