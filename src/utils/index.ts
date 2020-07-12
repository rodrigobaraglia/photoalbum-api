import { ExpressionWithTypeArguments, ForInStatement } from "typescript";
import {IAsync, IComposite, IPipeline} from "./declarations";
//Utility functions

//Functions are named to keep track of them in error messages. Underscore is used to denote inner functions.

export function handleAsync<F extends Function>(fn: F): IAsync {
  return async function _handleAsync(...args) {
    try {
      return await fn(...args);
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export function isDefined<T>(o: T) {
  return o !== undefined;
}


export function compose<T extends any[]>(...fns: T): IComposite<T> {
  return function _compose(...args) {
    return  fns.reduceRight((res, fn) => fn(res), args);
  };
}

export function pipe<T extends any[]>(...fns: T): IPipeline<T> {
  return function _pipe(...args) {
    return fns.reduce((res, fn) => fn(res), args);
  };
}

export const compose2 = <T extends any[], U extends any[], Z>(
  ...fns: T
): ((...args: U) => Z) => (...args: U): Z =>
  fns.reduceRight((res, fn) => fn(res), args);

  function sum1(x: number) {
  return x + 1;
}
function mult3(x: number) {
  return x * 3;
}
function log(x: string): void {
  return console.log(`${x}`);
}


const test = compose(log, sum1, sum1, mult3)
const pipeTest = pipe(mult3, sum1, sum1, log)
test(1) 
pipeTest(1)