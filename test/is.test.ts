import { Buffer } from 'node:buffer';
import { assert, describe, expect, it } from 'vitest';
import { isArray, isArrayBuffer, isBlob, isBoolean, isBuffer, isClass, isDate, isDefined, isEmptyArray, isEmptyMap, isEmptyObject, isEmptySet, isError, isFinite, isFormData, isFunction, isHtmlElement, isMap, isNan, isNil, isNonEmptyString, isNull, isNumber, isObject, isPlainObject, isPositiveNumber, isRegExp, isSet, isString, isSymbol, isUndefined, isUrlString, isWeakMap, isWeakRef, isWeakSet } from '../src/index.ts';

class HTMLMockElement {
  nodeName: string;
  nodeType: number;
  innerHTML: string;
  ownerDocument: any;
  style: any;
  attributes: string;
  nodeValue: string;
  constructor() {
    this.nodeName = 'div';
    this.nodeType = 1;
    this.innerHTML = '';
    this.ownerDocument = {};
    this.style = {};
    this.attributes = '';
    this.nodeValue = '';
  }

  get [Symbol.toStringTag]() {
    return 'HTMLMockElement';
  }
}

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
    const mockElement = new HTMLMockElement();
    expect(isHtmlElement(mockElement)).toEqual(true);
  });
  it('isRegExp', () => {
    const mockElement = new HTMLMockElement();
    expect(isRegExp(mockElement)).toEqual(false);
  });
  it('isNonEmptyString', () => {
    expect(isNonEmptyString('')).toEqual(false);
  });
  it('isSymbol', () => {
    const namedSymbol = Symbol('description');
    expect(isSymbol(namedSymbol)).toEqual(true);
  });
  it('isBlob', () => {
    const textBlob = new Blob(['Hello, world!'], { type: 'text/plain' });
    expect(isBlob(textBlob)).toEqual(true);
  });
  it('isBuffer', () => {
    const stringBuffer = Buffer.from('Hello Buffer!');
    expect(isBuffer(stringBuffer)).toEqual(true);
  });
  it('isUrlString', () => {
    expect(isUrlString('https://hacxy.cn')).toEqual(true);
    expect(isUrlString('hacxy.cn')).toEqual(false);
    expect(isUrlString('http://hacxy.cn')).toEqual(true);
    expect(isUrlString(0)).toEqual(false);
  });

  it('isArrayBuffer', () => {
    const arrayBuf = new ArrayBuffer(8);
    expect(isArrayBuffer(arrayBuf)).toEqual(true);
  });
  it('isFormData', () => {
    const formData = new FormData();
    expect(isFormData(formData)).toEqual(true);
  });
  it('isEmptyObject', () => {
    const obj = {};
    expect(isEmptyObject(obj)).toEqual(true);
  });

  it('isEmptyMap', () => {
    const mapValue = new Map();
    expect(isEmptyMap(mapValue)).toEqual(true);
  });
  it('isEmptySet', () => {
    const setValue = new Set();
    expect(isEmptySet(setValue)).toEqual(true);
  });
  it('isClass', () => {
    expect(isClass(HTMLMockElement)).toEqual(true);
  });
  it('isWeakMap', () => {
    const weakMapValue = new WeakMap();
    expect(isWeakMap(weakMapValue)).toEqual(true);
  });
  it('isWeakRef', () => {
    const weakRefValue = new WeakRef({});
    expect(isWeakRef(weakRefValue)).toEqual(true);
  });
  it('isWeakSet', () => {
    const weakSetValue = new WeakSet();
    expect(isWeakSet(weakSetValue)).toEqual(true);
  });
  it('isError', () => {
    const errorValue = new Error('message');
    expect(isError(errorValue)).toEqual(true);
  });
  it('isPositiveNumber', () => {
    const num = 1.111;
    expect(isPositiveNumber(num)).toEqual(true);
  });
});
