import { NumberFn } from '../../src/index';

const arrayFn = new NumberFn();

test('random 传入参数小于2个', () => {
  expect(arrayFn.random()).toBeNull();
})

test('formatInToThousand example 1', () => {
  expect(arrayFn.formatInToThousand('2')).toBe('2');
})

test('formatInToThousand example 2', () => {
  expect(arrayFn.formatInToThousand('1234')).toBe('1.234');
})

test('formatInToThousand example 3', () => {
  expect(arrayFn.formatInToThousand(1234)).toBe('1.234');
})

test('formatInToThousand example 4', () => {
  expect(arrayFn.formatInToThousand(1234, '-')).toBe('1-234');
})

test('numberToChinese 2', () => {
  expect(arrayFn.numberToChinese(2)).toStrictEqual('二')
})

test('numberToChinese 20000', () => {
  expect(arrayFn.numberToChinese(20010)).toStrictEqual('二万一十')
})

test('changeToChinese 20010', () => {
  expect(arrayFn.changeToChinese(20010.245)).toStrictEqual('贰万零壹拾元贰角肆分')
})
