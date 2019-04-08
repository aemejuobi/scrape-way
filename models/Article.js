const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// Create a schema
const ArticleSchema = new Schema({
    // _id: ObjectId,
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;