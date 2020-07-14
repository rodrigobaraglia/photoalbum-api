import {IAsync, IComposite, IPipeline } from "./declarations";
import {Tail, First, Last, Reverse, SliceStartQuantity} from "typescript-tuple";
import {Composibility, Composable as _Composable, Cast} from "./utilities"


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

export function nothing() {
  // return o !== undefined; 
  console.log("esto es incorrecto")
}




export function compose<T extends any[]>(...fns: _Composable<T>): IComposite<T> {
  return function _compose(...args) {
    return  fns.reduceRight((res, fn) => fn(res), args);
  };
}

export function pipe<T extends any[]>(...fns: _Composable<T>): IPipeline<T> {
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
function log(x: number): string {
  return `${x}`;
} 



type Test = [1,boolean, string]
type Fns = [typeof sum1, typeof mult3, typeof sum1]
type HasTail<T extends any[]> =  T extends ([] | [any]) ? false : true
type ParamInfer<P> = P extends [a: infer A] ? A : never
type Prev<T extends any[]> = HasTail<T> extends true ? Tail<T>[0] : T
type PrevParams<T extends any[]> = Prev<T> extends ((...args:any) => any)? Parameters<Prev<T>> : never 
type Test3 = PrevParams<Fns>
type Test4 = ReturnType<Fns[0]>
type MatchPrevParams<F extends ((...args:any) => any)> = ReturnType<F> extends ParamInfer<PrevParams<Fns>> ? true : false

type MapReturns<Tuple extends [...any[]]> = {
  [Index in keyof Tuple]: Tuple[Index] extends (...args: any) => any ? ReturnType<Tuple[Index]> : never
} 

type ReverseInfer<P> = P extends [_: infer A] & {length: number} ? A : never

type MapParams<Tuple extends [...any[]]> =  {
[Index in keyof Tuple]: Tuple[Index] extends (...args: any) => any ? ParamInfer<Parameters<Tuple[Index]>> : never
} 
// type MapInfer<Tuple extends [...any[]]> =  {
//   [Index in keyof Tuple]: Tuple extends [_: any] ? true : false;
//   } 

type TestMapParams = Last<MapParams<isOk>>
type TestMapReturns = First<Tail<MapReturns<isOk>>>
type _TestMapReturns<T extends any[]> = Tail<MapReturns<T>> extends [any, ...[any]] ? First<Tail<MapReturns<T>>> : never
type TestZip = TestMapReturns extends TestMapParams ? true : false

// type ZipWithMatch<TupleA extends [...any[]], TupleB extends [...any[]]> = {
//   [IndexA in keyof TupleA]: TupleA[Index] extends TupleB[Index] ? true : false 
// } & {length: TupleA['length'] & TupleB['length']};

type FunctionInfer<F> = F extends (...args: infer A) => infer R ? [A, R] : never

type MapPrevParams<Tuple extends [...any[]]> = {
  [Index in keyof Tuple]: Tuple[Index] extends (...args:any)=>any ? MatchPrevParams<Tuple[Index]> : never;
} & {length: Tuple['length']};

type isOk = [typeof log, typeof sum1, typeof sum1, typeof mult3]
type notOk = [typeof log, typeof sum1, typeof nothing, typeof mult3]
type TestOk = ReduceBool<MapPrevParams<Tail<isOk>>>


type Test7 = MapPrevParams<Fns> extends true ? true : false

type ReduceBool<Tuple extends [...any []]> = Tuple extends [true, ...true[]] ? true : false 
type Test8 = Composable<Tail<isOk>> 
type Test9 = ReduceBool<MapPrevParams<Tail<isOk>>>
type Test10 = ReduceBool<MapPrevParams<Tail<notOk>>>
type Test11 = Composable<Tail<isOk>>
type Test12 = Composable<Tail<notOk>>
type Composable<T extends any[] | [...any[]]> = ReduceBool<MapPrevParams<T>> extends true ? T : never


//Compiler should catch inconsistensies between 
//parameters and return types between functions in the middle of the argument array
const test = compose( sum1, sum1, mult3)
const pipeTest = pipe(mult3, sum1, sum1)
test(1) 
pipeTest(1)