import { StringFn } from '../../src/index';

const stringFn = new StringFn();
const str = ' A string. '

test('trim type 1', () => {
  expect(stringFn.trim(str, 1)).toBe('Astring.');
})

test('trim type 2', () => {
  expect(stringFn.trim(str, 2)).toBe('A string.');
})

test('trim type 3', () => {
  expect(stringFn.trim(str, 3)).toBe('A string. ');
})

test('trim type 4', () => {
  expect(stringFn.trim(str, 4)).toBe(' A string.');
})

test('changeCase type 1', () => {
  expect(stringFn.changeCase(str, 1)).toBe(' A String. ');
})

test('changeCase type 2', () => {
  expect(stringFn.changeCase(str, 2)).toBe(' a sTRING. ');
})

test('changeCase type 3', () => {
  expect(stringFn.changeCase(str, 3)).toBe(' a STRING. ');
})

test('changeCase type 4', () => {
  expect(stringFn.changeCase(str, 4)).toBe(' A STRING. ');
})

test('randomString', () => {
  expect(stringFn.randomString(4))
})

test('convertToCamelCase', () => {
  expect(stringFn.convertToCamelCase('a-string')).toBe('aString')
})
