

const scrapeIt = require("scrape-it");
const HashSet = require('hashset');

const uniqueInternalLinks = new HashSet();
const completed = new HashSet();

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
    console.log(`Status Code: ${response.statusCode}`);
    if(response.statusCode !== 200) throw new "statusCode not 200";
    //console.log(JSON.stringify(data, null, ' '));
    return data;
}
function addToLinks(data) {
    //go through data and push to uniqueInternalLinks
    data.articleLinks.forEach((itm) => {
        //uniqueInternalLinks.push(itm.link)
        if(itm.link) uniqueInternalLinks.add(itm.link);
    });

    if(data.sideMenu) {
        data.sideMenu.forEach((itm) => {
            //uniqueInternalLinks.push(itm.menulink)
            if(itm.menulink && itm.menulink.length > 1 && itm.menulink !== "/rss/") uniqueInternalLinks.add(itm.menulink);
        });
    }
    return true; //uniqueInternalLinks is global
}

function printHashset() {
    console.log( JSON.stringify(uniqueInternalLinks.toArray(), null, 2) );
}

// From here on out, it's a loop.
function nextPage() {
    //take one from the list.
    if(uniqueInternalLinks.length) {
        const link = uniqueInternalLinks.toArray()[0];
        console.log("-------------------------------");
        console.log("Page", link);
        if(link) {
            scrapeIt(`https://theOpenSourceU.org${link}`, filters.page)
                .then(report)
                .then((d) => {
                    completed.add(link);
                    uniqueInternalLinks.remove(link);
                })
                .then(nextPage);
        } else {
            printHashset();
            nextPage();
        }
    }
}


// Promise interface
scrapeIt("https://theOpenSourceU.org", filters.homePage)
    .then(report)
    .then(addToLinks)
    .then(printHashset)
    .then(nextPage)
;