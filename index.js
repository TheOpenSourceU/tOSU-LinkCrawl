

const scrapeIt = require("scrape-it");
const HashSet = require('hashset');

const uniqueInternalLinks = new HashSet();

const filters = {
    homePage: {
        //body: "body",
        articleLinks: {
            listItem: "article",
            data: {
                link: {
                    selector: "a",
                    attr: "href"
                }
            }
        },
        sideMenu: {
            listItem: ".nav ul li",
            data: {
                menulink: {
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

function report({data, response}) {
    console.log(`Status Code: ${response.statusCode}`)
    console.log(JSON.stringify(data, null, ' '));
    return data;
}
function addToLinks(data) {
    //go through data and push to uniqueInternalLinks
    data.articleLinks.forEach((itm) => {
        //uniqueInternalLinks.push(itm.link)
        uniqueInternalLinks.add(itm.link);
    });

    if(data.sideMenu) {
        data.sideMenu.forEach((itm) => {
            //uniqueInternalLinks.push(itm.menulink)
            uniqueInternalLinks.add(itm.menulink);
        });
    }
    return true; //uniqueInternalLinks is global
}

// Promise interface
scrapeIt("https://theOpenSourceU.org", filters.homePage)
    .then(report)
    .then(addToLinks)
    .then(nextPage);