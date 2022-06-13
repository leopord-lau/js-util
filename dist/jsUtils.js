// js-utils v1.0.0 Copyright (c) 2022 leo
import CryptoJS from 'crypto-js';

class ArrayFn {
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

class NumberFn {
  /**
   * 在范围内取一个随机值
   * @param {Number} min
   * @param {Number} max
   * @returns {null || Number}
   */
  random(min, max) {
    if (arguments.length === 2) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    } else {
      return null;
    }
  }

  /**
   * 千位分隔符
   * @param {Number | String} number 
   * @param {*} separator 
   * @returns {String}
   */
  formatInToThousand(number, separator = '.') {
    let numStr = number.toString();
    let length = numStr.length;
    if(length <= 3) {
        return numStr;
    } else {
      let remain = length % 3;
      if(remain > 0) {
        return numStr.slice(0, remain) + separator + numStr.slice(remain, length).match(/\d{3}/g)?.join(separator);
      } else {
        return numStr.slice(0, length).match(/\d{3}/g).join(separator);
      }
    }
  }

  /**
   * 将阿拉伯数字翻译成中文的大写数字
   * @param {Number} num
   * @returns {String}
   */
  numberToChinese(num) {
    var AA = new Array(
      '零',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '十'
    );
    var BB = new Array('', '十', '百', '千', '万', '亿', '点', '');
    var a = ('' + num).replace(/(^0*)/g, '').split('.'),
      k = 0,
      re = '';
    for (var i = a[0].length - 1; i >= 0; i--) {
      switch (k) {
        case 0:
          re = BB[7] + re;
          break;
        case 4:
          if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$').test(a[0]))
            re = BB[4] + re;
          break;
        case 8:
          re = BB[5] + re;
          BB[7] = BB[5];
          k = 0;
          break;
      }
      if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
        re = AA[0] + re;
      if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
      k++;
    }

    if (a.length > 1) {
      // 加上小数部分(如果有小数部分)
      re += BB[6];
      for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    if (re == '一十') re = '十';
    if (re.match(/^一/) && re.length == 3) re = re.replace('一', '');
    return re;
  }

  /**
   * 将数字转换为大写金额
   * @param {Number} num
   * @returns {String}
   */
  changeToChinese(Num) {
    //判断如果传递进来的不是字符的话转换为字符
    if (typeof Num == 'number') {
      Num = new String(Num);
    }
    Num = Num.replace(/,/g, ''); //替换tomoney()中的“,”
    Num = Num.replace(/ /g, ''); //替换tomoney()中的空格
    Num = Num.replace(/￥/g, ''); //替换掉可能出现的￥字符
    if (isNaN(Num)) {
      //验证输入的字符是否为数字
      //alert("请检查小写金额是否正确");
      return '';
    }
    //字符处理完毕后开始转换，采用前后两部分分别转换
    var part = String(Num).split('.');
    var newchar = '';
    //小数点前进行转化
    for (var i = part[0].length - 1; i >= 0; i--) {
      if (part[0].length > 10) {
        return '';
        //若数量超过拾亿单位，提示
      }
      var tmpnewchar = '';
      var perchar = part[0].charAt(i);
      switch (perchar) {
        case '0':
          tmpnewchar = '零' + tmpnewchar;
          break;
        case '1':
          tmpnewchar = '壹' + tmpnewchar;
          break;
        case '2':
          tmpnewchar = '贰' + tmpnewchar;
          break;
        case '3':
          tmpnewchar = '叁' + tmpnewchar;
          break;
        case '4':
          tmpnewchar = '肆' + tmpnewchar;
          break;
        case '5':
          tmpnewchar = '伍' + tmpnewchar;
          break;
        case '6':
          tmpnewchar = '陆' + tmpnewchar;
          break;
        case '7':
          tmpnewchar = '柒' + tmpnewchar;
          break;
        case '8':
          tmpnewchar = '捌' + tmpnewchar;
          break;
        case '9':
          tmpnewchar = '玖' + tmpnewchar;
          break;
      }
      switch (part[0].length - i - 1) {
        case 0:
          tmpnewchar = tmpnewchar + '元';
          break;
        case 1:
          if (perchar != 0) tmpnewchar = tmpnewchar + '拾';
          break;
        case 2:
          if (perchar != 0) tmpnewchar = tmpnewchar + '佰';
          break;
        case 3:
          if (perchar != 0) tmpnewchar = tmpnewchar + '仟';
          break;
        case 4:
          tmpnewchar = tmpnewchar + '万';
          break;
        case 5:
          if (perchar != 0) tmpnewchar = tmpnewchar + '拾';
          break;
        case 6:
          if (perchar != 0) tmpnewchar = tmpnewchar + '佰';
          break;
        case 7:
          if (perchar != 0) tmpnewchar = tmpnewchar + '仟';
          break;
        case 8:
          tmpnewchar = tmpnewchar + '亿';
          break;
        case 9:
          tmpnewchar = tmpnewchar + '拾';
          break;
      }
      var newchar = tmpnewchar + newchar;
    }
    //小数点之后进行转化
    if (Num.indexOf('.') != -1) {
      if (part[1].length > 2) {
        // alert("小数点之后只能保留两位,系统将自动截断");
        part[1] = part[1].substr(0, 2);
      }
      for (i = 0; i < part[1].length; i++) {
        tmpnewchar = '';
        perchar = part[1].charAt(i);
        switch (perchar) {
          case '0':
            tmpnewchar = '零' + tmpnewchar;
            break;
          case '1':
            tmpnewchar = '壹' + tmpnewchar;
            break;
          case '2':
            tmpnewchar = '贰' + tmpnewchar;
            break;
          case '3':
            tmpnewchar = '叁' + tmpnewchar;
            break;
          case '4':
            tmpnewchar = '肆' + tmpnewchar;
            break;
          case '5':
            tmpnewchar = '伍' + tmpnewchar;
            break;
          case '6':
            tmpnewchar = '陆' + tmpnewchar;
            break;
          case '7':
            tmpnewchar = '柒' + tmpnewchar;
            break;
          case '8':
            tmpnewchar = '捌' + tmpnewchar;
            break;
          case '9':
            tmpnewchar = '玖' + tmpnewchar;
            break;
        }
        if (i == 0) tmpnewchar = tmpnewchar + '角';
        if (i == 1) tmpnewchar = tmpnewchar + '分';
        newchar = newchar + tmpnewchar;
      }
    }
    //替换所有无用汉字
    while (newchar.search('零零') != -1)
      newchar = newchar.replace('零零', '零');
    newchar = newchar.replace('零亿', '亿');
    newchar = newchar.replace('亿万', '亿');
    newchar = newchar.replace('零万', '万');
    newchar = newchar.replace('零元', '元');
    newchar = newchar.replace('零角', '');
    newchar = newchar.replace('零分', '');
    if (newchar.charAt(newchar.length - 1) == '元') {
      newchar = newchar + '整';
    }
    return newchar;
  }
}

class StringFn {
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
  randomString = function (length) {
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

class TypeFn {
  /**
   * 是否是字符串类型
   * @param {*} obj
   * @returns {Boolean}
   */
  isString(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'String';
  }

  /**
   * 是否是数字类型
   * @param {*} obj
   * @returns {Boolean}
   */
  isNumber(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Number';
  }

  /**
   * 字符串中是否只包含数字
   * @param {*} obj 
   * @returns {Boolean}
   */
  isNumberOnly(obj) {
    if(this.isString(obj) || this.isNumber(obj)) {

      return this.isNumber(obj) || /^[0-9]+$/.test(obj);
    } else {
      console.log('传入参数非string或者number类型');
      return false;
    }
  }

  /**
   * 将值转换成数字类型，如果转换后是NAN，返回0
   * @param {*} obj 
   * @returns 
   */
  assertNumber(obj) {
    return Number(obj) === NaN ? 0 : Number(obj);
  }

  /**
   * 是否是布尔类型
   * @param {*} obj
   * @returns {Boolean}
   */
  isBoolean(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Boolean';
  }

  /**
   * 是否是函数
   * @param {*} obj
   * @returns {Boolean}
   */
  isFunction(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Function';
  }

  /**
   * 是否是null
   * @param {*} obj
   * @returns {Boolean}
   */
  isNull(obj) {
    //是否为null
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Null';
  }

  /**
   * 是否是undefined
   * @param {*} obj
   * @returns {Boolean}
   */
  isUndefined(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Undefined';
  }

  /**
   * 是否是对象
   * @param {*} obj
   * @returns {Boolean}
   */
  isObj(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
  }

  /**
   * 是否是数组类型
   * @param {*} obj
   * @returns {Boolean}
   */
  isArray(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Array';
  }

  /**
   * 是否是date类型
   * @param {*} obj
   * @returns {Boolean}
   */
  isDate(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Date';
  }

  /**
   * 是否是正则类型
   * @param {*} obj
   * @returns {Boolean}
   */
  isRegExp(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'RegExp';
  }

  /**
   * 是否是错误类型
   * @param {*} obj
   * @returns {Boolean}
   */
  isError(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Error';
  }

  /**
   * 是否是symbol类型
   * @param {*} obj
   * @returns {Boolean}
   */
  isSymbol(obj) {
    //是否Symbol函数
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Symbol';
  }

  /**
   * 是否是promise对象
   * @param {*} obj
   * @returns {Boolean}
   */
  isPromise(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Promise';
  }

  /**
   * 是否是set类型
   * @param {*} obj
   * @returns {Boolean}
   */
  isSet(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Set';
  }

  /**
   * 是否为false
   * @param {*} obj
   * @returns {Boolean}
   */
  isFalse(obj) {
    if (
      obj == '' ||
      obj == undefined ||
      obj == null ||
      obj == 'null' ||
      obj == 'undefined' ||
      obj == 0 ||
      obj == false ||
      obj == NaN
    )
      return true;
    return false;
  }

  /**
   * 是否为true
   * @param {*} obj
   * @returns {Boolean}
   */
  isTrue(o) {
    return !this.isFalse(o);
  }

  /**
   * 设备是否是ios
   * @param {*} obj
   * @returns {Boolean}
   */
  isIos() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      //安卓手机
      // return "Android";
      return false;
    } else if (u.indexOf('iPhone') > -1) {
      //苹果手机
      // return "iPhone";
      return true;
    } else if (u.indexOf('iPad') > -1) {
      //iPad
      // return "iPad";
      return false;
    } else if (u.indexOf('Windows Phone') > -1) {
      //winphone手机
      // return "Windows Phone";
      return false;
    } else {
      return false;
    }
  }

  /**
   * 设备是否为pc
   * @param {*} obj
   * @returns {Boolean}
   */
  isPC() {
    //是否为PC端
    var userAgentInfo = navigator.userAgent;
    var Agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
      'iPad',
      'iPod',
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  /**
   * 浏览器类型
   * @param {*} obj
   * @returns {Boolean}
   */
  browserType() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器
    var isIE =
      userAgent.indexOf('compatible') > -1 &&
      userAgent.indexOf('MSIE') > -1 &&
      !isOpera; //判断是否IE浏览器
    var isIE11 =
      userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf('Firefox') > -1; //判断是否Firefox浏览器
    var isSafari =
      userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1; //判断是否Safari浏览器
    var isChrome =
      userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1; //判断Chrome浏览器

    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp['$1']);
      if (fIEVersion == 7) return 'IE7';
      else if (fIEVersion == 8) return 'IE8';
      else if (fIEVersion == 9) return 'IE9';
      else if (fIEVersion == 10) return 'IE10';
      else return 'IE7以下'; //IE版本过低
    }
    if (isIE11) return 'IE11';
    if (isEdge) return 'Edge';
    if (isFF) return 'FF';
    if (isOpera) return 'Opera';
    if (isSafari) return 'Safari';
    if (isChrome) return 'Chrome';
  }

  /**
   * 手机号验证
   * @param {*} str
   * @returns {Boolean}
   */
  isPhone(str) {
    return /^1[3|4|5|6|7|8][0-9]{9}$/.test(str);
  }

  /**
   * 座机号码验证
   * @param {*} str
   * @returns {Boolean}
   */
  isTel(str) {
    return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
  }

  /**
   * 邮政编码验证
   * @param {*} str
   * @returns {Boolean}
   */
  isPostal(str) {
    return /[1-9]\d{5}(?!\d)/.test(str);
  }

  /**
   * qq号码验证
   * @param {*} str
   * @returns {Boolean}
   */
  isQQ(str) {
    return /^[1-9][0-9]{4,9}$/.test(str);
  }

  /**
   * 邮箱验证
   * @param {*} str
   * @returns {Boolean}
   */
  isEmail(str) {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
  }

  /**
   * 密码验证，密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
   * @param {*} str
   * @returns {Boolean}
   */
  isPassword(str) {
    return /^[a-zA-Z]\w{5,17}$/.test(str);
  }

  /**
   * 是否是网址
   * @param {*} str
   * @returns {Boolean}
   */
  isURL(str) {
    return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
      str
    );
  }

  /**
   * 是否是ip
   * @param {*} str
   * @returns {Boolean}
   */
  isIP(str) {
    return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
      str
    );
  }

  /**
   * 是否是日期时间 xxxx-xx-xx xx:xx:xx 或者 xxxx-xx-xx
   * @param {*} str
   * @returns {Boolean}
   */
  isDateFormat(str) {
    return (
      /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
        str
      ) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
    );
  }

  /**
   * 是否是小写
   * @param {*} str
   * @returns {Boolean}
   */
  isLowercase(str) {
    return /^[a-z]+$/.test(str);
  }

  /**
   * 是否是大写
   * @param {*} str
   * @returns {Boolean}
   */
  isUppercase(str) {
    return /^[A-Z]+$/.test(str);
  }

  /**
   * 是否是英文
   * @param {*} str
   * @returns {Boolean}
   */
  isEnglish(str) {
    return /^[a-zA-Z]+$/.test(str);
  }

  /**
   * 是否是中文
   * @param {*} str
   * @returns {Boolean}
   */
  isChinese(str) {
    return /^[\u4E00-\u9FA5]+$/.test(str);
  }

  /**
   * 是否是html
   * @param {*} str
   * @returns {Boolean}
   */
  isHTML(str) {
    return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
  }

  /**
   * 是否是ipv6格式
   * @param {*} str
   * @returns {Boolean}
   */
  isIPv6(str) {
    return str.match(/:/g) ? 
        ((str.match(/:/g))).length <= 7 
        :
        /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str);
  }

  /**
   * 验证身份证号
   * @param {*} obj
   * @returns
   */
  isCardID(sId) {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
      console.log('你输入的身份证长度或格式错误');
      return false;
    }
    //身份证城市
    var aCity = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外',
    };
    if (!aCity[parseInt(sId.substr(0, 2))]) {
      console.log('你的身份证地区非法');
      return false;
    }

    // 出生日期验证
    var sBirthday = (
        sId.substr(6, 4) +
        '-' +
        Number(sId.substr(10, 2)) +
        '-' +
        Number(sId.substr(12, 2))
      ).replace(/-/g, '/'),
      d = new Date(sBirthday);
    if (
      sBirthday !=
      d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()
    ) {
      console.log('身份证上的出生日期非法');
      return false;
    }

    // 身份证号码校验
    var sum = 0,
      weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      codes = '10X98765432';
    for (var i = 0; i < sId.length - 1; i++) {
      sum += sId[i] * weights[i];
    }
    var last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (sId[sId.length - 1] != last) {
      console.log('你输入的身份证号非法');
      return false;
    }

    return true;
  }
}

class DateFn {
  /**
   * 格式化时间
   * @param {*} time
   * @param {*} cFormat
   * @returns {string}
   */
  formatTime(time, cFormat) {
    if (arguments.length === 0) return null;
    if ((time + '').length === 10) {
      time = +time * 1000;
    }

    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}',
      date;
    if (typeof time === 'object') {
      date = time;
    } else {
      date = new Date(time);
    }

    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      var value = formatObj[key];
      if (key === 'a')
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return time_str;
  }

  /**
   * 返回指定长度的月份集合
   *
   * @param  {time} 时间
   * @param  {len} 长度
   * @param  {direction} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
   * @return {Array} 数组
   *
   * @example   getMonths('2018-1-29', 6, 1)  // ->  ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
   */
  getMonths(time, len, direction) {
    var mm = new Date(time).getMonth() + 1,
      yy = new Date(time).getFullYear(),
      direction = isNaN(direction) ? 3 : direction,
      index = mm;

    var cutMonth = function (index) {
      var arr;
      if (direction === 1) {
        arr = formatPre(index).reverse();
      } else if (direction === 2) {
        arr = formatNext(index);
      } else {
        arr = formatPre(index)
          .reverse()
          .slice(len / 2)
          .concat(formatNext(index).slice(1, len / 2 + 1));
      }
      return arr.sort(function (t1, t2) {
        return new Date(t1).getTime() - new Date(t2).getTime();
      });
    };

    var formatPre = function (index) {
      var currNum = index,
        preNum = 0,
        currArr = [],
        preArr = [];
      if (index - len < 0) {
        preNum = len - currNum;
      }
      for (var i = 0; i < currNum; i++) {
        currArr.push([yy + '-' + (currNum - i)]);
      }
      for (var i = 1; i <= preNum; i++) {
        preArr.push([yy - Math.ceil(i / 12) + '-' + (12 - ((i - 1) % 12))]);
      }
      return currArr.concat(preArr);
    };

    var formatNext = function (index) {
      var currNum = 12 - index,
        nextNum = 0,
        currArr = [],
        nextArr = [];
      if (len - currNum > 0) {
        nextNum = len - currNum;
      }
      for (var i = 0; i <= currNum; i++) {
        currArr.push([yy + '-' + (index + i)]);
      }
      for (var i = 1; i < nextNum; i++) {
        nextArr.push([
          yy + Math.ceil(i / 12) + '-' + (i % 13 === 0 ? 1 : i % 13),
        ]);
      }
      return currArr.concat(nextArr);
    };
    return cutMonth(index);
  }

  /**
   * 返回指定长度的天数集合
   *
   * @param  {time} 时间
   * @param  {len} 长度
   * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
   * @return {Array} 数组
   *
   * @example date.getDays('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
   */
  getDays(time, len, diretion) {
    var tt = new Date(time);
    var getDay = function (day) {
      var t = new Date(time);
      t.setDate(t.getDate() + day);
      var m = t.getMonth() + 1;
      return t.getFullYear() + '-' + m + '-' + t.getDate();
    };
    var arr = [];
    if (diretion === 1) {
      for (var i = 1; i <= len; i++) {
        arr.unshift(getDay(-i));
      }
    } else if (diretion === 2) {
      for (var i = 1; i <= len; i++) {
        arr.push(getDay(i));
      }
    } else {
      for (var i = 1; i <= len; i++) {
        arr.unshift(getDay(-i));
      }
      arr.push(
        tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate()
      );
      for (var i = 1; i <= len; i++) {
        arr.push(getDay(i));
      }
    }
    return diretion === 1
      ? arr.concat([
          tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate(),
        ])
      : diretion === 2
      ? [
          tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate(),
        ].concat(arr)
      : arr;
  }

  /**
   * @param  {s} 秒数
   * @return {String} 字符串
   *
   * @example formatHMS(3610) // -> 1h0m10s
   */
  formatHMS(s) {
    var str = '';
    if (s > 3600) {
      str =
        Math.floor(s / 3600) +
        'h' +
        Math.floor((s % 3600) / 60) +
        'm' +
        (s % 60) +
        's';
    } else if (s > 60) {
      str = Math.floor(s / 60) + 'm' + (s % 60) + 's';
    } else {
      str = (s % 60) + 's';
    }
    return str;
  }

  /*获取某月有多少天*/
  getMonthOfDay(time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var mouth = date.getMonth() + 1;
    var days;

    //当月份为二月时，根据闰年还是非闰年判断天数
    if (mouth == 2) {
      days =
        (year % 4 == 0 && year % 100 == 0 && year % 400 == 0) ||
        (year % 4 == 0 && year % 100 != 0)
          ? 28
          : 29;
    } else if (
      mouth == 1 ||
      mouth == 3 ||
      mouth == 5 ||
      mouth == 7 ||
      mouth == 8 ||
      mouth == 10 ||
      mouth == 12
    ) {
      //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
      days = 31;
    } else {
      //其他月份，天数为：30.
      days = 30;
    }
    return days;
  }

  /*获取某年有多少天*/
  getYearOfDay(time) {
    var firstDayYear = this.getFirstDayOfYear(time);
    var lastDayYear = this.getLastDayOfYear(time);
    var numSecond =
      (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime()) /
      1000;
    return Math.ceil(numSecond / (24 * 3600));
  }

  /*获取某年的第一天*/
  getFirstDayOfYear(time) {
    var year = new Date(time).getFullYear();
    return year + '-01-01 00:00:00';
  }

  /*获取某年最后一天*/
  getLastDayOfYear(time) {
    var year = new Date(time).getFullYear();
    var dateString = year + '-12-01 00:00:00';
    var endDay = this.getMonthOfDay(dateString);
    return year + '-12-' + endDay + ' 23:59:59';
  }

  /*获取某个日期是当年中的第几天*/
  getDayOfYear(time) {
    var firstDayYear = this.getFirstDayOfYear(time);
    var numSecond =
      (new Date(time).getTime() - new Date(firstDayYear).getTime()) / 1000;
    return Math.ceil(numSecond / (24 * 3600));
  }

  /*获取某个日期在这一年的第几周*/
  getDayOfYearWeek(time) {
    var numdays = this.getDayOfYear(time);
    return Math.ceil(numdays / 7);
  }
}

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("3333e6e143439161");
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("e3bbe7e3ba84431a");

class OtherFn {
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

const typeFn = new TypeFn();
const otherFn = new OtherFn();

class StorageFn {
  constructor(config) {
    // 前缀
    this.prefix = config.prefix ? config.prefix : undefined;
    // 默认不加密
    this.isEncrypt = config.isEncrypt ? config.isEncrypt : false;

    // 私有方法，并不暴露在原型链上
    this.addPrefix = StorageFn.addPrefix.bind(this); 
    this.setStorage = StorageFn.setStorage.bind(this);
    this.getStorage = StorageFn.getStorage.bind(this);
    this.hasStorage = StorageFn.hasStorage.bind(this);
    this.getStorageKeys = StorageFn.getStorageKeys.bind(this);
    this.getAllStorage = StorageFn.getAllStorage.bind(this);
    this.getStorageLength = StorageFn.getStorageLength.bind(this);
    this.removeStorage = StorageFn.removeStorage.bind(this);
    this.clearStorage = StorageFn.clearStorage.bind(this);
  }

  /**
   * 设置cookie
   * @param {*} key 
   * @param {*} value
   * @param {String | Number} day cookie保存天数
   */
  setCookie(key, value, day = 0) {
    if(arguments.length === 2) {
      if(typeFn.isObj(arguments[0]) && typeFn.isNumberOnly(arguments[1])) {
        for (let i in key) {
          const date = new Date();
          date.setDate(date.getDate() + typeFn.assertNumber(arguments[1]));
          document.cookie = this.addPrefix(i) + '=' + key[i] + ';expires=' + date;
        }
      }
    } else {
      const date = new Date();
      date.setDate(date.getDate() + typeFn.assertNumber(day));
      document.cookie = this.addPrefix(key) + '=' + value + ';expires=' + date;
    }
  }

  /**
   * 获取cookie
   * @param {*} key
   * @returns {String}
   */
  getCookie(key) {
    key = this.addPrefix(key);
    const arr = document.cookie.split('; ');
    for (let i = 0; i < arr.length; i++) {
      const arr2 = arr[i].split('=');
      if (arr2[0] == key) {
        return arr2[1];
      }
    }
    return '';
  }

  /**
   * 根据key删除cookie
   * @param {*} key
   */
  removeCookie(key) {
    this.setCookie(key, 1, -1);
  }

  /**
   * 设置localStorage
   * @param {*} key
   * @param {*} value
   * @param {String | Number} expire 保存天数; 默认为0，不会过期; 如果解析后的值为NaN，也默认设置不过期
   */
  setLocal(key, value, expire = 0) {
    if(arguments.length === 1 || arguments.length === 2) {
      this.setStorage('localStorage', key, expire);
    } else {
      this.setStorage('localStorage', key, value, expire);
    }
  }

  /**
   * 根据key获取对应的localStorage值，如果之前设置了过期时间并且已过期，返回null
   * @param {*} key
   * @returns {String | null}
   */
  getLocal(key) {
    return this.getStorage('localStorage', key);
  }

  /**
   * 该key是否已经在localStorage中被设置了
   * @param {*} key
   * @returns {Boolean}
   */
  hasLocal(key) {
    return this.hasStorage('localStorage', key);
  }

  /**
   * 获取localStorage中所有的key
   * @returns {Array}
   */
  getLocalKeys() {
    return this.getStorageKeys('localStorage');
  }

  /**
   * 获取全部localStroage
   * @returns {Array}
   */
  getAllLocal() {
    return this.getAllStorage('localStorage');
  }

  /**
   * 获取localStorage长度
   * @returns {Number}
   */
  getLocalLength() {
    return this.getStorageLength('localStorage');
  }

  /**
   * 根据key移除对应的localStorage值
   * @param {*} key
   */
  removeLocal(key) {
    this.removeStorage('localStorage', key);
  }

  /**
   * 移除所有localStorage
   */
  clearLocal() {
    this.clearStorage('localStorage');
  }

  /**
   * 设置sessionStorage, 当网页关闭时自动删除session，不做额外处理
   * @param {*} key
   * @param {*} value
   * @param {String | Number} expire 保存天数; 默认为0，不会过期; 如果解析后的值为NaN，也默认设置不过期
   */
   setSession(key, value, expire = 0) {
    if(arguments.length === 1 || arguments.length === 2) {
      this.setStorage('sessionStorage', key, expire);
    } else {
      this.setStorage('sessionStorage', key, value, expire);
    }
  }

  /**
   * 根据key获取对应的sessionStorage值，如果之前设置了过期时间并且已过期，返回null
   * @param {*} key
   * @returns {String | null}
   */
  getSession(key) {
    return this.getStorage('sessionStorage', key);
  }

  /**
   * 该key是否已经在sessionStorage中被设置了
   * @param {*} key
   * @returns {Boolean}
   */
  hasSession(key) {
    return this.hasStorage('sessionStorage', key);
  }

  /**
   * 获取sessionStorage中所有的key
   * @returns {Array}
   */
  getSessionKeys() {
    return this.getStorageKeys('sessionStorage');
  }

  /**
   * 获取全部sessionStroage
   * @returns {Array}
   */
  getAllSession() {
    return this.getAllStorage('sessionStorage');
  }

  /**
   * 获取sessionStorage长度
   * @returns {Number}
   */
  getSessionLength() {
    return this.getStorageLength('sessionStorage');
  }

  /**
   * 根据key移除对应的sessionStorage值
   * @param {*} key
   */
  removeSession(key) {
    this.removeStorage('sessionStorage', key);
  }

  /**
   * 移除所有SessionStorage
   */
  clearSession() {
    this.clearStorage('sessionStorage');
  }

  /**
   * 自动给key添加前缀
   * @param {*} key 
   * @returns 
   */
   static addPrefix(key) {
    const prefix = this.prefix ? `${this.prefix}_` : '';
    return prefix + key;
  }

  /**
   * 设置storage
   * @param {*} key
   * @param {*} value
   * @param {String | Number} expire 保存天数; 默认为0，不会过期; 如果解析后的值为NaN，也默认设置不过期
   */
  static setStorage(type, key, value, expire) {
    if(arguments.length === 3) {
      if(typeFn.isObj(arguments[1])) {
        if(!typeFn.isNumberOnly(arguments[2])) {
          throw new Error('Expire must be a number');
        }
        for (var i in arguments[1]) {
          const data = {
            value: arguments[1][i],
            timeStamp: new Date().getTime(),
            expire: arguments[2] * 60 * 1000 * 60 *24
          };
          const encryptData = this.isEncrypt ? otherFn.encrypt(data) : JSON.stringify(data);
          window[type].setItem(this.addPrefix(i), encryptData);
        }
      }
    } else {
      if(!typeFn.isNumberOnly(expire)) {
        throw new Error('Expire must be a number');
      }
      const data = {
        value,
        timeStamp: new Date().getTime(),
        expire: expire * 60 * 1000 * 60 *24
      };
      const encryptData = this.isEncrypt ? otherFn.encrypt(data) : JSON.stringify(data);
      window[type].setItem(this.addPrefix(key), encryptData);
    }
  }


  /**
   * 根据key获取对应的storage值，如果之前设置了过期时间并且已过期，返回null
   * @param {String} type storage 类型
   * @param {*} key
   * @returns {String | null}
   */
   static getStorage(type, key) {
    key = this.addPrefix(key);
    
    if(!window[type].getItem(key)) {
      return null;
    }

    const data = this.isEncrypt ? JSON.parse(otherFn.decrypt(window[type].getItem(key))) : JSON.parse(window[type].getItem(key));
    if(data.expire === 0) {
      return data.value;
    } else {
      if(new Date().getTime() - data.timeStamp > data.expire) {
        this.removeLocal(key);
        return null;
      } else {
        return data.value;
      }
    }
  }

  /**
   * 该key是否已经在storage中被设置了
   * @param {String} type storage类型
   * @param {*} key
   * @returns {Boolean}
   */
   static hasStorage(type, key) {
    const arr = this.getStorageKeys(type).filter(item => {
      return item === key;
    });
    return arr.length ? true : false;
  }

  /**
   * 获取storage中所有的key
   * @param {String} type storage类型
   * @returns {Array}
   */
  static getStorageKeys(type) {
    const keys = [];
    let storages = this.getAllStorage(type);
    for(let i = 0; i < storages.length; i ++) {
      keys.push(storages[i].key);
    }
    return keys;
  }

  /**
   * 获取全部storage
   * @param {String} type storage类型
   * @returns {Array}
   */
  static getAllStorage(type) {
    const length = window[type].length;
    const arr = [];
    for(let i = 0; i < length; i++) {
      const key = window[type].key(i);
      const value = this.isEncrypt ? JSON.parse(otherFn.decrypt(window[type].getItem(key))) : window[type].getItem(key);
      arr.push({key: window[type].key(i).substring(this.prefix.length + 1), value: value.value});
    }
    return arr;
  }

  /**
   * 获取storage长度
   * @param {String} type storage类型
   * @returns {Number}
   */
  static getStorageLength(type) {
    return window[type].length;
  }

  /**
   * 根据key移除对应的storage值
   * @param {String} type storage类型
   * @param {*} key
   */
  static removeStorage(type, key) {
    window[type].removeItem(this.addPrefix(key));
  }

  /**
   * 移除所有localStorage
   * @param {String} type storage类型
   */
  static clearStorage(type) {
    window[type].clear();
  }
}

const install = (prefix="_default", isEncrypt=true) => {
  Array.prototype._jsUtils = new ArrayFn();
  Number.prototype._jsUtils = new NumberFn();
  String.prototype._jsUtils = new StringFn();
  Date.prototype._jsUtils = new DateFn();
  Object.prototype._jsUtils = new TypeFn();
  Storage.prototype._jsUtils = new StorageFn({
    prefix,
    isEncrypt
  });
};

export { ArrayFn, DateFn, NumberFn, StorageFn, StringFn, TypeFn, install };
