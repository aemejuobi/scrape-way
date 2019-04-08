$(document).ready(() => {

    // Function to get scraped data in the database
    const scrape = () => {
        $.get("/api/scrape", (response) => {
            console.log(response);
            return response;
        });
    }

    // Function to display scraped data after it has been put in the database
    const getArticle = () => {
        // deleteArticles();
        scrape();
        $.get("/api/articles", (response) => {
            response.forEach((item) => {
                $(".list-group").append(`<a href=${item.link} class="list-group-item list-group-item-action" target="blank">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${item.title}</h5>
                </div>
                <p class="mb-1">${item.date}</p>
            </a>`);
            });
        });
    }
    getArticle();

    // const deleteArticles = () => {
    //     $.delete("/api/articles", (response) => {
    //         console.log(response);
    //         return response;
    //     });
    // }
});