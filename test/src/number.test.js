import { NumberFn } from '../../src/index';

const arrayFn = new NumberFn();

test('random 传入参数小于2个', () => {
  expect(arrayFn.random()).toBeNull();
})

test('random', () => {
  expect(arrayFn.random(1,3)).
})


test('numberToChinese', () => {
  expect(arrayFn.numberToChinese(2)).toStrictEqual('二')
})
