import { assert, describe, expect, it } from 'vitest';
import { isArray, isBoolean, isDate, isDefined, isEmptyArray, isFinite, isFunction, isHtmlElement, isMap, isNan, isNil, isNull, isNumber, isObject, isPlainObject, isSet, isString, isUndefined } from '../src/index.ts';

describe('is', () => {
  it('isNumber', () => {
    assert.isTrue(isNumber(0));
    assert.isTrue(isNumber(100));
    assert.isTrue(isNumber(Infinity));
    assert.isTrue(isNumber(-Infinity));

    assert.isFalse(isNumber(Number.NaN));
    assert.isFalse(isNumber(''));
  });

  it('isString', () => {
    assert.isTrue(isString(''));
    assert.isFalse(isString(0));
  });

  it('isBoolean', () => {
    assert.isTrue(isBoolean(!!0));
  });

  it('isPlainObject', () => {
    assert.isTrue(isPlainObject({}));
    assert.isFalse(isPlainObject(null));
    assert.isFalse(isPlainObject(() => undefined));
    assert.isFalse(isPlainObject(Number()));

    assert.isTrue(isPlainObject(Object.create(null)));
    assert.isFalse(isPlainObject(new Map()));
    assert.isFalse(isPlainObject([]));
  });
  it('isUndefined', () => {
    assert.isTrue(isUndefined(undefined));
    assert.isFalse(isUndefined(0));
  });
  it('isNil', () => {
    const value1 = isNil(undefined);
    expect(value1).toEqual(true);
    const value2 = isNil(null);
    expect(value2).toEqual(true);
  });
  it('isNan', () => {
    const value1 = isNan(Number.NaN);
    expect(value1).toEqual(true);
    const value2 = isNan(0);
    expect(value2).toEqual(false);
  });

  it('isObject', () => {
    const value1 = isObject({});
    expect(value1).toEqual(true);
    const value2 = isObject(null);
    expect(value2).toEqual(false);
    const value3 = isObject(() => { });
    expect(value3).toEqual(true);
  });

  it('isEmptyArray', () => {
    const value1 = isEmptyArray([]);
    expect(value1).toEqual(true);
    const value2 = isEmptyArray([1]);
    expect(value2).toEqual(false);
  });

  it('isFunction', () => {
    const value1 = isFunction(() => { });
    expect(value1).toEqual(true);
    const value2 = isFunction({});
    expect(value2).toEqual(false);
  });
  it('isNull', () => {
    const value1 = isNull(null);
    assert.isTrue(value1);
  });
  it('isArray', () => {
    const input = ['a', 'b', 'c'];
    const value1 = isArray(input);
    assert.isTrue(value1);
    const value2 = isArray([], isString);
    assert.isFalse(value2);
    const value3 = isArray(input, isString);
    assert.isTrue(value3);
    const value4 = isArray([1, 2, 3], isNumber);
    assert.isTrue(value4);
  });

  it('isDefined', () => {
    const input = [1, undefined, 3];
    const value = input.filter(isDefined);
    expect(value).toEqual([1, 3]);
  });
  it('isFinite', () => {
    expect(isFinite(1000)).toEqual(true);
    expect(isFinite(Infinity)).toEqual(false);
    expect(isFinite(-Infinity)).toEqual(false);
  });
  it('isMap', () => {
    const mapValue = new Map();
    expect(isMap(mapValue)).toEqual(true);
  });
  it('isSet', () => {
    const setValue = new Set();
    expect(isSet(setValue)).toEqual(true);
  });
  it('isDate', () => {
    const dateValue = new Date();
    expect(isDate(dateValue)).toEqual(true);
  });
  it('isHtmlElement', () => {
    expect(isHtmlElement('')).toEqual(false);
    expect(isHtmlElement({})).toEqual(false);
  });
});
