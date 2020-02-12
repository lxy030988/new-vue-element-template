//遍历树  获取类型为type的数据
export function eachTree(data, arr, type) {
  data.forEach(item => {
    if (item.type === type) {
      arr.push(item.path);
    }
    if (item.children) {
      eachTree(item.children, arr, type);
    }
  });
  return arr;
}

export function filterTree(arr) {
  return arr
    .filter(item => item.type === "nav" || item.type === "page")
    .map(item => {
      // item = Object.assign({}, item);
      if (item.children) {
        item.children = filterTree(item.children);
      }
      return item;
    });
}

export function mapTree(a) {
  let d = a.map(r => {
    if (r.children) {
      return {
        name: r.name,
        id: r.id,
        children: mapTree(r.children)
      };
    } else {
      return {
        name: r.name,
        id: r.id
      };
    }
  });
  return d;
}

//根据path获取当前数据
export function getTreeNow(data, path) {
  for (let item of data) {
    if (item.path === path) {
      return item;
    } else {
      if (item.children) {
        const now = getTreeNow(item.children, path);
        if (now !== undefined) {
          return now;
        }
      }
    }
  }
}

//获取 树形结构的 父级数据
function getTreeFather(data, now) {
  for (let value of data) {
    if (value.id === now.parentId) {
      return value;
    } else {
      if (value.children) {
        let father = getTreeFather(value.children, now);
        if (father !== undefined) {
          return father;
        }
      }
    }
  }
}
//获取树形结构的 初始值arr
export function getTreeArr(data, now, arr) {
  if (!now.parentId) {
    arr.unshift(now);
    return arr;
  } else {
    arr.unshift(now);
    let father = getTreeFather(data, now);
    getTreeArr(data, father, arr);
  }
  return arr;
}
