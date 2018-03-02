

const scrapeIt = require("scrape-it");

const filters = {
    homePage: {
        //body: "body",
        articleLinks: {
            listItem: "article",
            data: {
                links: {
                    selector: "a",
                    attr: "href"
                }
            }
        },
        sideMenu: {
            listItem: ".nav ul li",
            data: {
                menulinks: {
                    selector: "a",
                    attr: "href",
                    convert: function(d) {
                        const alt = d.replace('https://theopensourceu.org', "");
                        return (alt === d) ? false : alt;
                    }
                }
            }
        }
    }
};

// Promise interface
scrapeIt("https://theOpenSourceU.org", filters.homePage)
    .then(({ data, response }) => {
    console.log(`Status Code: ${response.statusCode}`)
    console.log(JSON.stringify(data, null, ' '));
});