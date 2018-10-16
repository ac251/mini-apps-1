

module.exports = (obj) => {
  let csv = '';
  const arrays = [];
  const queue = [obj];
  let nextIdxFromQueue = 0;
  let lastKeysIdx;
  let doKeysMatch = (obj) => {
    if (lastKeysIdx === undefined) { return false; }
    for (let key in obj) {
      if (key !== 'children' && !arrays[lastKeysIdx].has(key)) {
        return false;
      }
    }
    for (let key of arrays[lastKeysIdx].values()) {
      if (!(key in obj)) {
        return false;
      }
    }
    return true;
  }
  while (nextIdxFromQueue < queue.length) {
    let currentObj = queue[nextIdxFromQueue++];
    if (!doKeysMatch(currentObj)) {
      let newKeys = new Set();
      for (let key in currentObj) {
        if (key !== 'children') {
          newKeys.add(key);
        }
      }
      lastKeysIdx = arrays.length;
      arrays.push(newKeys);
    }
    let values = []
    arrays[lastKeysIdx].forEach(key => values.push(currentObj[key]))
    arrays.push(values);
    if (currentObj.children) {
      currentObj.children.forEach(child => queue.push(child));
    }
  }
  
  return arrays.map(array => Array.from(array))
    .map(array => array.join(','))
    .join('\n');
 
};