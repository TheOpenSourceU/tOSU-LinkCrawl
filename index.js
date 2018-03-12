

const scrapeIt = require("scrape-it");
const HashSet = require('hashset');

const uniqueInternalLinks = new HashSet();

const filters = require('./filters/all');




// Promise interface
scrapeIt("https://theOpenSourceU.org", filters)
  .catch(console.log)
  .then(report)

  .then(itms => {
      const linkList = itms.all;
    linkList.forEach(itm => {
        uniqueInternalLinks.add(itm.link || ''); //should make sure we're unique
      });
      console.log('done adding items: ', uniqueInternalLinks.toArray());
  })
;



//
////////////////////////////////////////

/**
 * Output our findings.
 *
 * @param data
 * @param response
 * @returns {*}
 */
function report({data, response}) {
  console.log(`Status Code: ${response.statusCode}`);
  if(response.statusCode !== 200) throw new "statusCode not 200";
  console.log('data:', data);
  return data;
}