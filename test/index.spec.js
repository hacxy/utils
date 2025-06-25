/* eslint-disable no-console */
// eslint-disable-next-line antfu/no-import-dist
import { isArray, randomNumber } from '../dist/index.js';

const foo = ['1'];

const value = isArray(foo);

console.log(value);
const num = randomNumber();
console.log(num);
