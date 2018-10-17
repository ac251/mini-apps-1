

// module.exports = (obj) => {
//   if (typeof obj === 'string') {
//     try {
//       obj = JSON.parse(obj);
//     } catch(err) {
//       obj = {"error message" : "invalid input, try again"};
//     }
//   }
//   let csv = '';
//   const arrays = [];
//   const queue = [obj];
//   let nextIdxFromQueue = 0;
//   let lastKeysIdx;
//   let doKeysMatch = (obj) => {
//     if (lastKeysIdx === undefined) { return false; }
//     for (let key in obj) {
//       if (key !== 'children' && !arrays[lastKeysIdx].has(key)) {
//         return false;
//       }
//     }
//     for (let key of arrays[lastKeysIdx].values()) {
//       if (!(key in obj)) {
//         return false;
//       }
//     }
//     return true;
//   }
//   while (nextIdxFromQueue < queue.length) {
//     let currentObj = queue[nextIdxFromQueue++];
//     if (!doKeysMatch(currentObj)) {
//       let newKeys = new Set();
//       for (let key in currentObj) {
//         if (key !== 'children') {
//           newKeys.add(key);
//         }
//       }
//       lastKeysIdx = arrays.length;
//       arrays.push(newKeys);
//     }
//     let values = []
//     arrays[lastKeysIdx].forEach(key => values.push(currentObj[key]))
//     arrays.push(values);
//     if (currentObj.children) {
//       currentObj.children.forEach(child => queue.push(child));
//     }
//   }
  
//   return arrays.map(array => Array.from(array))
//     .map(array => array.join(','))
//     .join('<br/>');
 
// };

module.exports = (obj) => {
  if (typeof obj === 'string') {
    try {
      obj = JSON.parse(obj);
    } catch(err) {
      obj = {"error message" : "invalid input, try again"};
    }
  }
  const arrays = [];
  const queue = [obj];
  let nextIdxFromQueue = 0;
  const keys = new Set(['index', 'parent'])
  
  while (nextIdxFromQueue < queue.length) {
    let currentObj = queue[nextIdxFromQueue];
    currentObj.index = nextIdxFromQueue;
    for (let key in currentObj) {
      if (key !== 'children') {
        keys.add(key);
      }
    }
    if (currentObj.children) {
      currentObj.children.forEach(child => {
        child.parent = nextIdxFromQueue;
        queue.push(child);
      });
    }
    nextIdxFromQueue++;
  }
  arrays[0] = Array.from(keys);
  queue.forEach(obj => {
    arrays.push(arrays[0].map(key => obj[key]));
  });
  return arrays.map(array => array.join(',')).join('<br/>');
};