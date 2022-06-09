import { ArrayFn } from '../../src/index';

const arrayFn = new ArrayFn();
const arr = [1, 2, 3, 4, 4, 5];
const arr1 = [1, 2, 7];
function double(n) {
  return 2 * n;
}

test('has', () => {
  expect(arrayFn.has(arr, 1)).toBe(true);
});

test('unique', () => {
  expect(arrayFn.unique(arr)).toStrictEqual([1, 2, 3, 4, 5]);
});

test('remove', () => {
  expect(arrayFn.remove(arr, 1)).toStrictEqual([2, 3, 4, 4, 5]);
});

test('max', () => {
  expect(arrayFn.max(arr)).toStrictEqual(5);
});

test('min', () => {
  expect(arrayFn.min(arr)).toBe(2);
});

test('sum', () => {
  expect(arrayFn.sum(arr)).toBe(18);
});

test('average', () => {
  expect(arrayFn.average(arr)).toBe(18 / 5);
});

test('form', () => {
  expect(arrayFn.form(arr)).toStrictEqual([2, 3, 4, 4, 5]);
});

test('map', () => {
  expect(arrayFn.map(arr, double)).toStrictEqual([4, 6, 8, 8, 10]);
});

test('union', () => {
  expect(arrayFn.union(arr, arr1)).toStrictEqual([2, 3, 4, 5, 1, 7]);
});

test('intersect', () => {
  expect(arrayFn.intersect(arr, arr1)).toStrictEqual([2]);
});

test('sort', () => {
  expect(arrayFn.sort(arr, -1)).toStrictEqual([5, 4, 4, 3, 2]);
});
