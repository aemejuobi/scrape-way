module.exports = (app) => {
    
    app.get("/", (req, res) => {
        res.render("index", {
            title: "Scrape-Way",
            header: "Gnaw, We Scrape!!!"
        });
    });
}