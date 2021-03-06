import CryptoJS from 'crypto-js';
// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("3333e6e143439161");
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("e3bbe7e3ba84431a");

export default class OtherFn {
  /**
   * 深克隆
   * @param  {*} obj 克隆对象
   * @return {*}     深克隆后的对象
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    var isType = function (obj, type) {
      var flag,
        typeString = Object.prototype.toString.call(obj);
      switch (type) {
        case 'Array':
          flag = typeString === '[object Array]';
          break;
        case 'Date':
          flag = typeString === '[object Date]';
          break;
        case 'RegExp':
          flag = typeString === '[object RegExp]';
          break;
        default:
          flag = false;
      }
      return flag;
    };
    var getRegExp = function (re) {
      var flags = '';
      if (re.global) flags += 'g';
      if (re.ignoreCase) flags += 'i';
      if (re.multiline) flags += 'm';
      return flags;
    };

    var _clone = function (parent) {
      var child,
        proto,
        parents = [],
        children = [];
      if (isType(parent, 'Array')) {
        // 对数组做特殊处理
        child = [];
      } else if (isType(parent, 'RegExp')) {
        // 对正则做特殊处理
        child = new RegExp(parent.source, getRegExp(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (isType(parent, 'Date')) {
        // 对Date做特殊处理
        child = new Date(parent.getTime());
      } else {
        // 处理对象原型
        proto = Object.getPrototypeOf(parent);
        // 利用Object.create切断原型链
        child = Object.create(proto);
      }
      // 处理循环引用
      var index = parents.indexOf(parent);

      if (index != -1) {
        // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
        return children[index];
      }
      parents.push(parent);
      children.push(child);

      for (var i in parent) {
        child[i] = _clone(parent[i]);
      }

      return child;
    };
    return _clone(obj);
  }

  /**
   * 防抖动
   * @param  {Function} fn        [执行的函数]
   * @param  {Number}   delay     [多少秒之后执行]
   * @param  {Boolean}   immediate [是否立即执行]
   * @return {Function}
   */
  debounce(fn, delay, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) fn.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
      if (callNow) fn.apply(context, args);
    };
  }

  /**
   * 节流
   * @param  {Function} func  [执行的函数]
   * @param  {Number} delay [多少秒之内执行一次]
   * @return {Function}
   */
  throttle(func, delay) {
    var prev = Date.now();
    return function () {
      var context = this;
      var args = arguments;
      var now = Date.now();
      if (now - prev >= delay) {
        func.apply(context, args);
        prev = Date.now();
      }
    };
  }

  /**
   * 数据加密
   * @param {*} data 
   * @param {String} key 密钥
   * @param {String} iv  密钥偏移量
   * @returns {String}
   */
   encrypt(data, key = SECRET_KEY, iv = SECRET_IV) {
    if(Object.prototype.toString.call(data).slice(8, -1) === 'Object') {
      data = JSON.stringify(data);
    }

    const dataHex = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(dataHex, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.ciphertext.toString();
  }

  /**
   * 数据解密，解密的密钥跟密钥偏移量要跟加密时的保持一致
   * @param {*} data 
   * @param {String} key 密钥
   * @param {String} iv  密钥偏移量
   * @returns 
   */
  decrypt(data, key = SECRET_KEY, iv = SECRET_IV) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(str, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
}
