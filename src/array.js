export default class ArrayFn {
  /**
   * 判断数组中是否存在某个元素
   * @param {Array} arr 数组
   * @param {*} val 元素
   * @returns
   */
  has(arr, val) {
    return arr.indexOf(val) != -1 ? true : false;
  }

  /**
   * 去重
   * @param {Array} arr
   * @returns {Array}
   */
  unique(arr) {
    if (Array.hasOwnProperty('from')) {
      return Array.from(new Set(arr));
    } else {
      var map = {},
        newArr = [];
      for (var i = 0; i < arr.length; i++) {
        if (!map[arr[i]]) {
          map[arr[i]] = true;
          newArr.push(arr[i]);
        }
      }
      return newArr;
    }
  }

  /**
   * 删除数组中的某个元素
   * @param {Array} arr 数组
   * @param {*} val 元素
   * @returns {Array}
   */
  remove(arr, val) {
    var index = arr.indexOf(val);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  /**
   * 获取数组中的最大值
   * @param {Array} arr
   */
  max(arr) {
    return Math.max.apply(null, arr);
  }

  /**
   * 获取数组中的最小值
   * @param {Array} arr
   */
  min(arr) {
    return Math.min.apply(null, arr);
  }

  /**
   * 数组元素求和
   * @param {Array} arr
   */
  sum(arr) {
    return arr.reduce((pre, cur) => {
      return pre + cur;
    });
  }

  /**
   * 数组元素平均值
   * @param {Array} arr
   */
  average(arr) {
    return this.sum(arr) / arr.length;
  }

  /**
   * 将类数组转换成数组
   * @param {*} arr
   */
  form(arr) {
    var newArr = [];
    if (Array.isArray(arr)) {
      newArr = arr;
    } else {
      newArr = Array.prototype.slice.call(arr);
    }
    return newArr;
  }

  /**
   * 传入一个函数和数组并遍历将数组中得值作为函数参数，返回所有返回值组合成得数组
   * @param  {Array} arr 数组
   * @param  {function} fn 回调函数
   * @param  {*} context 上下文
   * @return {Array}
   */
  map(arr, fn, context) {
    var scope = context || window;
    var newArr = [];
    for (var i = 0, j = arr.length; i < j; ++i) {
      var res = fn.call(scope, arr[i], i, this);
      if (res != null) newArr.push(res);
    }
    return newArr;
  }

  /**
   * 求两个集合的并集
   * @param {*} a
   * @param {*} b
   * @returns
   */
  union(a, b) {
    var newArr = a.concat(b);
    return this.unique(newArr);
  }

  /**
   * 求两个集合的交集
   * @param {*} a
   * @param {*} b
   * @returns
   */
  intersect(a, b) {
    var _ = this;
    a = this.unique(a);
    return this.map(a, function (o) {
      return _.has(b, o) ? o : null;
    });
  }

  /**
   * 排序
   * @param  {arr} 数组
   * @param  {type} 1：从小到大   -1：从大到小
   * @return {Array}
   */
  sort(arr, type = 1) {
    return arr.sort((a, b) => {
      switch (type) {
        case 1:
          return a - b;
        case -1:
          return b - a;
        default:
          return arr;
      }
    });
  }

  /**
   * 数组扁平化
   * @param {Array} arr 
   * @returns 
   */
  flatten(arr) {
    let result = [];
    for(let i = 0; i < arr.length; i++) {
      if(Array.isArray(arr[i])) {
        result = result.concat(this.flatten(arr[i]));
      } else {
        result.push(arr[i]);
      }
    }
    return result;
  }

  /**
   * 数组内元素随机交换
   * @param {Array} arr 
   * @returns {Array}
   */
  shuffle(arr) {
    for(let i = 0; i < arr.length; i++) {
        const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
  }

  /**
   * 数组内元素随机生成
   * @param {Array} arr 
   * @returns {Array}
   */
  randomInArray (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
