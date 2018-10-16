

module.exports = (obj, _depth = 0, _arrays = {}) => {
  let csv = '';
  const arrays = [];
  arrays[0] = [];
  for (let key in obj) {
    if (key !== 'children') {
      arrays[0].push(key);
    }
  }
  
  let recurser = (child = obj) => {
    arrays.push(arrays[0].map(key => child[key]));
    if (child.children) {
      child.children.forEach(child => recurser(child));
    }
  };
  
  recurser();
  
  return arrays.map(subArr => subArr.join(',')).join('\n');
  
  
};