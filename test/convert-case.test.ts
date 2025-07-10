import { expect, it } from 'vitest';
import { convertCase } from '../src/';

it('convertCase', () => {
  const sample = 'hello_world-Example123';
  expect(convertCase(sample)).toEqual('HelloWorldExample123');
  expect(convertCase(sample, 'pascal')).toEqual('HelloWorldExample123');
  expect(convertCase(sample, 'camel')).toEqual('helloWorldExample123');
  expect(convertCase(sample, 'snake')).toEqual('hello_world_example123');
  expect(convertCase(sample, 'screaming_snake')).toEqual('HELLO_WORLD_EXAMPLE123');
  expect(convertCase(sample, 'kebab')).toEqual('hello-world-example123');
  expect(convertCase(sample, 'screaming_kebab')).toEqual('HELLO-WORLD-EXAMPLE123');
  expect(convertCase(sample, 'title')).toEqual('Hello World Example123');
  expect(convertCase(sample, 'lower')).toEqual('hello world example123');
  expect(convertCase(sample, 'upper')).toEqual('HELLO WORLD EXAMPLE123');
});
