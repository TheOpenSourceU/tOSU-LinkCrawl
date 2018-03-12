/**
 * Created by Frank on 3/11/2018.
 */

const converter = require('./convertInternalsOnly');

var dataNode = {
  link: {
    selector: "a",
    attr: "href"
  }
};

// This seems to work but does produce blank and repeated links.
module.exports = {
  all: {
    listItem: "*",
    data: {
      link: {
        selector: "a",
        attr: "href",
        convert: converter
      }
    }
  }
};