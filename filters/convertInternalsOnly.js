module.exports = function(elm) {

  if(elm === '' || elm === '#')
    return '';

  if(elm.startsWith('http') && !elm.startsWith('https://theopensourceu')) {
    //console.log('http rejected', elm);
    return '';
  }
  if(elm === 'https://theopensourceu.org') {
    return '/';
  }
  //console.log('success: ', elm);
  return elm.replace('https://theopensourceu.org/', '/');
};