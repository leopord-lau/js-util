import { StorageFn } from "../../src";

const storageFn = new StorageFn({
  prefix: 'test',
  isEncrypt: true
})

test('setCookie setCookie', () => {
  storageFn.setCookie('token', 'this is a token', 2);
  expect(storageFn.getCookie('token')).toBe('this is a token');
})

test('removeCookie', () => {
  storageFn.removeCookie('token');
  expect(storageFn.getCookie('token')).toBe('');
})

test('setLocal with 3 paramters', () => {
  storageFn.setLocal('local', 'localStorage test', '4');
  expect(storageFn.getLocal('local')).toBe('localStorage test');
})

test('setLocal with 2 paramters', () => {
  storageFn.setLocal({local2: 'localStorage test 2'}, 2);
  expect(storageFn.getLocal('local2')).toBe('localStorage test 2')
})

test('hasLocal', () => {
  expect(storageFn.hasLocal('local2')).toBeTruthy();
})

test('getLocalKeys', () => {
  expect(storageFn.getLocalKeys()).toStrictEqual(['local', 'local2']);
})

test('getAllLocal', () => {
  expect(storageFn.getAllLocal()).toStrictEqual([
    {key: 'local', value: 'localStorage test'},
    {key: 'local2', value: 'localStorage test 2'}
  ]);
})

test('getLocalLength', () => {
  expect(storageFn.getLocalLength()).toStrictEqual(2);
})

test('removeLocal', () => {
  storageFn.removeLocal('local2');
  expect(storageFn.getLocal('local2')).toBe(null);
})

test('clearLocal', () => {
  storageFn.clearLocal();
  expect(storageFn.getLocal('local')).toBe(null);
})


test('setSession with 3 paramters', () => {
  storageFn.setSession('session', 'sessionStorage test', '4');
  expect(storageFn.getSession('session')).toBe('sessionStorage test');
})

test('sessionLocal with 2 paramters', () => {
  storageFn.setSession({session2: 'sessionStorage test 2'}, 2);
  expect(storageFn.getSession('session2')).toBe('sessionStorage test 2')
})

test('hasSession', () => {
  expect(storageFn.hasSession('session2')).toBeTruthy();
})

test('getSessionKeys', () => {
  expect(storageFn.getSessionKeys()).toStrictEqual(['session', 'session2']);
})

test('getAllSession', () => {
  expect(storageFn.getAllSession()).toStrictEqual([
    {key: 'session', value: 'sessionStorage test'},
    {key: 'session2', value: 'sessionStorage test 2'}
  ]);
})

test('getSessionLength', () => {
  expect(storageFn.getSessionLength()).toStrictEqual(2);
})

test('removeSession', () => {
  storageFn.removeSession('session2');
  expect(storageFn.getSession('session2')).toBe(null);
})

test('clearSession', () => {
  storageFn.clearSession();
  expect(storageFn.getSession('session')).toBe(null);
})