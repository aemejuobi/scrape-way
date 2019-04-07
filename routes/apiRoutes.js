const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = (app) => {
    // Create GET request
    app.get("/scrape", (req, res) => {
    
    // Makes a request for koenigsegg news link through axios
        axios.get("https://www.koenigsegg.com/news/").then((response) => {
        
            // Loads the body of html into cheerio
            const $ = cheerio.load(response.data);

            // Find every a-tag with class of post-box with cheerio and loop through it
            $("a.post-box").each((i, element) => {
                // Create empty object to hold scraped results
                const result = {};

                // Within each element, find the h3 tag and save text of each h3 in a title var
                const title = $(element).find("h3").text();

                // Save the href attribute value of the element in a link var
                const link = $(element).attr("href");

                // Set key-value pairs for the title and link
                result.title = title;
                result.link = link;

                // So now, instead of pushing to the result array, I need to put this info in my mongoDB database
                db.Article.create(result).then((dbArticle) => {
                    console.log(dbArticle);
                    // res.json(dbArticle);
                }).catch((err) => {
                    console.log(err);
                });

            });
            // Log result
            // console.log(result);
        });
        
    });
}