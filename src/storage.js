export default class StorageFn {
  constructor() {
    this.ls = window.localStorage;
    this.ss = window.sessionStorage;
  }

  /**
   * 设置cookie
   * @param {*} name
   * @param {*} value
   * @param {*} day
   */
  setCookie(name, value, day) {
    var setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (var i in setting) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + day);
        document.cookie = i + '=' + setting[i] + ';expires=' + oDate;
      }
    } else {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + day);
      document.cookie = name + '=' + value + ';expires=' + oDate;
    }
  }

  /**
   * 获取cookie
   * @param {*} name
   * @returns {String}
   */
  getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=');
      if (arr2[0] == name) {
        return arr2[1];
      }
    }
    return '';
  }

  /**
   * 根据name删除cookie
   * @param {*} name
   */
  removeCookie(name) {
    this.setCookie(name, 1, -1);
  }

  /**
   * 设置localStorage
   * @param {*} key
   * @param {*} val
   */
  setLocal(key, val) {
    var setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (var i in setting) {
        this.ls.setItem(i, JSON.stringify(setting[i]));
      }
    } else {
      this.ls.setItem(key, JSON.stringify(val));
    }
  }

  /**
   * 根据key获取对应的localstorage值
   * @param {*} key
   * @returns
   */
  getLocal(key) {
    if (key) return JSON.parse(this.ls.getItem(key));
    return null;
  }

  /**
   * 根据key移除对应的localstorage值
   * @param {*} key
   */
  removeLocal(key) {
    this.ls.removeItem(key);
  }

  /**
   * 移除所有localstorage
   */
  clearLocal() {
    this.ls.clear();
  }

  /**
   * 设置sessionStorage
   * @param {*} key
   * @param {*} val
   */
  setSession(key, val) {
    var setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (var i in setting) {
        this.ss.setItem(i, JSON.stringify(setting[i]));
      }
    } else {
      this.ss.setItem(key, JSON.stringify(val));
    }
  }

  /**
   * 根据key获取对应的sessionStorage值
   * @param {*} key
   * @returns
   */
  getSession(key) {
    if (key) return JSON.parse(this.ss.getItem(key));
    return null;
  }

  /**
   * 根据key移除对应的sessionstorage值
   * @param {*} key
   */
  removeSession(key) {
    this.ss.removeItem(key);
  }

  /**
   * 移除所有的sessionstorage
   */
  clearSession() {
    this.ss.clear();
  }
}
