import ArrayFn from './array';
import NumberFn from './number';
import StringFn from './string';
import TypeFn from './type';
import DateFn from './date';
import StorageFn from './storage';

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
}

export { ArrayFn, NumberFn, StringFn, TypeFn, DateFn, StorageFn, install };
