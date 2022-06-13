import { DateFn } from "../../src";

const dateFn = new DateFn();

const currentTimeStamp = 1655125847619;

test('formatTime example 1', () => {
  expect(dateFn.formatTime()).toBe(null)
})

test('formatTime example 2', () => {
  expect(dateFn.formatTime(new Date(currentTimeStamp).getTime(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}')).toBe('2022-06-13 21:10:47 星期一')
})

test('getMonths', () => {
  expect(dateFn.getMonths(new Date(currentTimeStamp).getTime())).toStrictEqual([["2022-1"], ["2022-2"], ["2022-3"], ["2022-4"], ["2022-5"], ["2022-6"]])
})

test('getDays', () => {
  expect(dateFn.getDays(new Date(currentTimeStamp).getTime())).toStrictEqual(["2022-6-13"])
})

test('formatHMS', () => {
  expect(dateFn.formatHMS(500)).toBe('8m20s')
})

test('getMonthOfDay', () => {
  expect(dateFn.getMonthOfDay(new Date(currentTimeStamp).getTime())).toBe(30)
})

test('getYearOfDay', () => {
  expect(dateFn.getYearOfDay(new Date(currentTimeStamp).getTime())).toBe(365)
})

test('getFirstDayOfYear', () => {
  expect(dateFn.getFirstDayOfYear(new Date(currentTimeStamp).getTime())).toBe('2022-01-01 00:00:00')
})

test('getLastDayOfYear', () => {
  expect(dateFn.getLastDayOfYear(new Date(currentTimeStamp).getTime())).toBe('2022-12-31 23:59:59')
})

test('getDayOfYear', () => {
  expect(dateFn.getDayOfYear(new Date(currentTimeStamp).getTime())).toBe(164)
})

test('getLastDayOfYear', () => {
  expect(dateFn.getDayOfYearWeek(new Date(currentTimeStamp).getTime())).toBe(24)
})

