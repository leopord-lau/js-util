import { install  } from "../../src";

test('StringFn is install in String prototype', () => {
  install();
  expect(String.prototype._jsUtils).not.toBe(undefined)
})

test('use installed method', () => {
  install();
  expect(String.prototype._jsUtils.randomString(4)).not.toBe('random')
})

test('NumberFn is install in Number prototype', () => {
  install();
  expect(Number.prototype._jsUtils).not.toBe(undefined)
})

test('ArrayFn is install in Array prototype', () => {
  install();
  expect(Array.prototype._jsUtils).not.toBe(undefined)
})

test('DateFn is install in Date prototype', () => {
  install();
  expect(Date.prototype._jsUtils).not.toBe(undefined)
})

test('ObjectFn is install in Object prototype', () => {
  install();
  expect(Object.prototype._jsUtils).not.toBe(undefined)
})

test('StorageFn is install in Stroage prototype', () => {
  install();
  expect(Storage.prototype._jsUtils).not.toBe(undefined)
})