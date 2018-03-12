/**
 * Created by Frank on 3/11/2018.
 */
module.exports = {
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