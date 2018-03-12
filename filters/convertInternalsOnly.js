module.exports = function(elm) {

  if(elm === '' || elm === '#')
    return '';

  if(elm.startsWith('http') && !elm.startsWith('https://theopensourceu')) {
    console.log('http', elm);
    return '';
  }
  console.log('convert: ', elm);
  return elm.replace('https://theopensourceu.org/', '/');
};