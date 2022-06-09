export default class TypeFn {
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
