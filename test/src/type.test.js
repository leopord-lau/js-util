import { TypeFn } from "../../src/index";

const typeFn = new TypeFn();

test('isString', () => {
  expect(typeFn.isString('str')).toBeTruthy();
})

test('isNumber', () => {
  expect(typeFn.isNumber(1)).toBeTruthy();
})

test('isBoolean', () => {
  expect(typeFn.isBoolean(true)).toBeTruthy();
})

test('isFunction', () => {
  expect(typeFn.isFunction(() => {})).toBeTruthy();
})

test('isNull', () => {
  expect(typeFn.isNull(null)).toBeTruthy();
})

test('isUnderfined', () => {
  expect(typeFn.isUndefined(undefined)).toBeTruthy();
})

test('isObj', () => {
  expect(typeFn.isObj({})).toBeTruthy();
})

test('isArray', () => {
  expect(typeFn.isArray([1])).toBeTruthy();
})

test('isDate', () => {
  const date = new Date();
  expect(typeFn.isDate(date)).toBeTruthy();
})

test('isRegExp', () => {
  expect(typeFn.isRegExp(/\./)).toBeTruthy();
})

test('isError', () => {
  expect(typeFn.isError(new Error('error'))).toBeTruthy();
})

test('isSymbol', () => {
  expect(typeFn.isSymbol(Symbol('sym'))).toBeTruthy();
})

test('isPromise', () => {
  expect(typeFn.isPromise(new Promise((resolve) => {resolve(1)}))).toBeTruthy();
})

test('isSet', () => {
  expect(typeFn.isSet(new Set())).toBeTruthy();
})

test('isFalse', () => {
  expect(typeFn.isFalse('')).toBeTruthy();
})

test('isTrue', () => {
  expect(typeFn.isTrue('1')).toBeTruthy();
})

test('isIOS', () => {
  expect(typeFn.isIos()).not.toBeTruthy();
})

test('isPC', () => {
  expect(typeFn.isPC()).toBeTruthy();
})

test('isPhone', () => {
  expect(typeFn.isPhone('13147687654')).toBeTruthy();
})

test('isTel', () => {
  expect(typeFn.isTel('020-2435363-432')).toBeTruthy();
})

test('isPostal', () => {
  expect(typeFn.isPostal(514021)).toBeTruthy();
})

test('isQQ', () => {
  expect(typeFn.isQQ('2279846752')).toBeTruthy();
})

test('isEmail', () => {
  expect(typeFn.isEmail('2279846752@qq.com')).toBeTruthy();
})

test('isPassword', () => {
  expect(typeFn.isPassword('passWord')).toBeTruthy();
})

test('isUrl', () => {
  expect(typeFn.isURL('http://jest.io')).toBeTruthy();
})

test('isIp', () => {
  expect(typeFn.isIP('120.238.220.129')).toBeTruthy();
})

test('isDateFormat', () => {
  expect(typeFn.isDateFormat('2022-06-09')).toBeTruthy();
})

test('isLowercase', () => {
  expect(typeFn.isLowercase('leo')).toBeTruthy();
})

test('isUppercase', () => {
  expect(typeFn.isUppercase('LEO')).toBeTruthy();
})

test('isEnglish', () => {
  expect(typeFn.isEnglish('util')).toBeTruthy();
})

test('isChinese', () => {
  expect(typeFn.isChinese('工具库测试')).toBeTruthy();
})

test('isHTML', () => {
  expect(typeFn.isHTML('<div>hi jest</div>')).toBeTruthy();
})

test('isDateFormat', () => {
  expect(typeFn.isDateFormat('2022-06-09')).toBeTruthy();
})

test('isCardId', () => {
  expect(typeFn.isCardID('20220609')).not.toBeTruthy();
})


