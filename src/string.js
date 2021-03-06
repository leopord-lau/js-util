export default class StringFn {
  /**
   * 清除字符串中的空格
   * @param {String} str
   * @param {Number} type  1-所有空格  2-前后空格  3-前空格 4-后空格
   * @return {String}
   */
  trim(str, type) {
    type = type || 1;
    switch (type) {
      case 1:
        return str.replace(/\s+/g, '');
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, '');
      case 3:
        return str.replace(/(^\s*)/g, '');
      case 4:
        return str.replace(/(\s*$)/g, '');
      default:
        return str;
    }
  }

  /**
   * 改变字符大小写
   * @param  {String} str
   * @param {Number} type  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
   * @return {String}
   */
  changeCase(str, type) {
    type = type || 4;
    switch (type) {
      case 1:
        return str.replace(/\b\w+\b/g, function (word) {
          return (
            word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
          );
        });
      case 2:
        return str.replace(/\b\w+\b/g, function (word) {
          return (
            word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
          );
        });
      case 3:
        return str
          .split('')
          .map(function (word) {
            if (/[a-z]/.test(word)) {
              return word.toUpperCase();
            } else {
              return word.toLowerCase();
            }
          })
          .join('');
      case 4:
        return str.toUpperCase();
      case 5:
        return str.toLowerCase();
      default:
        return str;
    }
  }

  /**
   * 生成随机字符串
   * @param {Number} length
   * @returns
   */
  randomString(length) {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };

  /**
   * 将短横线格式转换成驼峰式
   * @param {*} str 
   * @returns 
   */
   convertToCamelCase(str) {
    return str.replace(/-[a-z]/g, (i) => i.substr(1).toUpperCase());
  }
}
