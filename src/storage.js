import OtherFn from './other';
import TypeFn from './type';

const typeFn = new TypeFn();
const otherFn = new OtherFn();

export default class StorageFn {
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
          }
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
      }
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
    })
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
