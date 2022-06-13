import ArrayFn from './array';
import NumberFn from './number';
import StringFn from './string';
import TypeFn from './type';
import DateFn from './date';
import StorageFn from './storage';

const install = (prefix="_default", isEncrypt=true) => {
  Array.prototype._jsUtil = new ArrayFn();
  Number.prototype._jsUtil = new NumberFn();
  String.prototype._jsUtil = new StringFn();
  Date.prototype._jsUtil = new DateFn();
  Object.prototype._jsUtil = new TypeFn();
  Storage.prototype._jsUtil = new StorageFn({
    prefix,
    isEncrypt
  });
}

export { ArrayFn, NumberFn, StringFn, TypeFn, DateFn, StorageFn, install };
