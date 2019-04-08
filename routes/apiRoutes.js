const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {
    // Create GET request
    app.get('/api/scrape', (req, res) => {

        // Makes a request for koenigsegg news link through axios
        axios.get('https://www.koenigsegg.com/news/').then((response) => {
            // Loads the body of html into cheerio
            const $ = cheerio.load(response.data);
            const results = [];

            // Find every a-tag with class of post-box with cheerio and loop through it
            $('a.post-box').each((i, element) => {
                // Create empty object to hold scraped results
                const result = {};

                // Within each element, find the h3 tag and save text of each h3 in a title var
                const title = $(element).find('h3').text();

                // Save the href attribute value of the element in a link var
                const link = $(element).attr('href');

                // Save date
                const date = $(element).find("span.morespace").text();

                // Set key-value pairs for the title and link and push into the results array
                result.title = title;
                result.link = link;
                result.date = date;
                results.push(result);
            });
            return results;
        
        }).then((results) => {
            // Create articles
            db.Article.create(results).then(() => {
                // res.send('Complete');
                res.json(results);
            }).catch((err) => {
                console.log(err);
            });
        });
        
    });

    // Display articles
    app.get("/api/articles", (req, res) => {
        db.Article.find({}).then((dbArticle) => {
            res.json(dbArticle);
        }).catch((err) => {
            console.log(err);
        });
    });

    // Get an article by grabbing it's specific id and populating it with it's comment
    app.get("/api/articles/:id", (req, res) => {
        db.Article.findOne({_id: req.params.id})
        .populate("comment")
        .then((dbArticle) => {
            res.json(dbArticle);
        }).catch((err) => {
            console.log(err);
        });
    });

    // Delete all articles
    app.delete("/api/articles", (req, res) => {
        db.Article.remove({}).then((dbArticle) => {
            res.json(dbArticle);
        }).catch((err) => {
            console.log(err);
        });
    });

    // Create a comment on a specific article
    app.post("/api/articles/:id", (req, res) => {
        const comment = req.body;
        
        db.Comment.create(comment).then((dbComment) => {
            return db.Article.findOne({_id: req.params.id}, {comment: dbComment._id});
        }).then((dbArticle) => {
            res.json(dbArticle);
        }).catch((err) => {
            console.log(err);
        });

    });

    // Display comments
    app.get("/api/comments", (req, res) => {
        db.Comment.find({}).then((dbComment) => {
            res.json(dbComment);
        }).catch((err) => {
            console.log(err);
        });
    });

    // Delete comment
    app.delete("/api/comments/:id", (req, res) => {
        const deletedComment = req.params.id;
        db.Comment.findOneAndDelete({_id: deletedComment}).then((dbComment) => {
            res.json(dbComment);
        }).catch((err) => {
            console.log(err);
        });
    });

};
