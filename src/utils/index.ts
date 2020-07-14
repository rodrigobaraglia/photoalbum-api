import { IAsync, IComposite, IPipeline } from "./declarations";
import { Composable } from "./utilities";

//Utility functions

//Functions are named to keep track of them in error messages. Underscore is used to denote inner functions.

//Should there be different ways to respond to an error?
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

//Would hasOwnProperty or some kind of Reflect method be a better validation tool?
//Parsing requests will demand more instances of validation
export function isDefined<T>(o: T) {
  return o !== undefined;
}

export function compose<T extends any[]>(...fns: Composable<T>): IComposite<T> {
  return function _compose(...args) {
    return fns.reduceRight((res, fn) => fn(res), args);
  };
}

export function pipe<T extends any[]>(...fns: Composable<T>): IPipeline<T> {
  return function _pipe(...args) {
    return fns.reduce((res, fn) => fn(res), args);
  };
}

//Testing type check:
function sum1(x: number) {
  return x + 1;
}
function mult3(x: number) {
  return x * 3;
}
function log(x: number): string {
  return `${x}`;
}
function nothing() {
  console.log("esto es incorrecto");
}

//Compiler should catch inconsistensies between
//parameters and return types between functions in the middle of the argument array
const test = compose(sum1, sum1, mult3);
const pipeTest = pipe(mult3, sum1, sum1);
test(1);
pipeTest(1);
