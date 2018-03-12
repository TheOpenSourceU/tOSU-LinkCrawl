

const scrapeIt = require("scrape-it");
const HashSet = require('hashset');
const filters = require('./filters/all');
const promise = require('bluebird');

const uniqueInternalLinks = new HashSet(); //ensures they are unique, first of all.
const completedLinks = new HashSet();
completedLinks.add('/');

const targetStart = "https://theOpenSourceU.org";
scrape(targetStart)
  .then(() => {
    console.log('completedLinks: ', completedLinks.toArray());
  });

function scrape(target) {

  if( completedLinks.contains(target) ) {
    return promise.resolve({ target:target, status: 'passed' });
  }

  completedLinks.add(target);

  // Promise interface
  return scrapeIt(target, filters)
    .then(report)

    .then(itms => {
      const linkList = itms.all;

      linkList.forEach(itm => {
        uniqueInternalLinks.add(itm.link || ''); //should make sure we're unique
      });
      console.log('done adding items: ', uniqueInternalLinks.toArray());
      return uniqueInternalLinks.toArray();
    })
    .then(uniqueLinks => {
      //We'll probably want bluebird for this for the utility.
      const promises = [];
      uniqueLinks.forEach(link => {
        var p = scrape(`${targetStart}${link}`, filters);
        promises.push(p);
      });
      return promise
        .all(promises) //maybe join instead.
        .then(allResult => {
          console.log('allResults', allResult); //check
          return allResult;                     //pass
        });
    }).catch(console.log)
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