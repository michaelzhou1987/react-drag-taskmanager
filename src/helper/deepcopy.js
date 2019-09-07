function deepcopy(target) {
  let result = null;
  if(typeof(target) === 'object') {
    if (target instanceof Array) {
      result = [];
    } else {
      result = {};
    }

    for(let i in target) {
      result[i] = deepcopy(target[i])
    }

  } else {
    result = target    
  }

  return result

}

export default deepcopy