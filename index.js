

const scrapeIt = require("scrape-it");
const HashSet = require('hashset');
const filters = require('./filters/all');


const targetStart = "https://theOpenSourceU.org";
scrape(targetStart);


function scrape(target) {


  // Promise interface
  scrapeIt(target, filters)
    .catch(console.log)
    .then(report)

    .then(itms => {
      const linkList = itms.all;
      const uniqueInternalLinks = new HashSet(); //ensures they are unique, first of all.
      linkList.forEach(itm => {
        uniqueInternalLinks.add(itm.link || ''); //should make sure we're unique
      });
      console.log('done adding items: ', uniqueInternalLinks.toArray());
      return uniqueInternalLinks.toArray();
    })
    .then(uniqueLinks => {
        //We'll probably want bluebird for this for the utility.
    })
    //scrape all results
  ;
}





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
  console.log('data:', '<not displayed>');
  return data;
}