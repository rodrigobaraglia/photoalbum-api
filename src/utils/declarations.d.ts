import {Last} from "typescript-tuple"
// import {Last as _Last, Head} from "./utilities"


type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;

type Tail<T extends any[]> = ((...t: T) => any) extends (
  _: any,
  ...tail: infer Rest
) => any
  ? Rest
  : [];

type Length<T extends any[]> = T["length"];

type Prepend<E, T extends any[]> = 
((head: E, ...args: T) => any) extends ((...args: infer U) => any) ? U : T
type Pos<I extends any[]> = Length<I>
type Next<I extends any[]> = Prepend<any, I>
type Prev<I extends any[]> = Tail<I>

type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
  0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>
  1: R
}[Pos<I> extends Length<T> ? 1 : 0]

type ParamInfer<P> = P extends [a: infer A] ? A : never

type MapReturns<Tuple extends any[]> = {
  [Index in keyof Tuple]: ReturnType<Tuple[Index]> 
} 

type MapParams<Tuple extends any[]> = {
[Index in keyof Tuple]: ParamInfer<Parameters<Tuple[Index]>>
};


type Returns<T> =  Tail<MapReturns<T>>
type Params<T> = Reverse<Tail<MapParams<T>>>;

type Composibility<F> = Returns<F> extends Params<F> ? true : false;


export interface IAsync {
  <T extends any[], Z>(...args: T): Promise<Z>;
}
export type Composable<T> = Composibility<T> extends true ? T : never

//Typescript-tuple provides tuple manipulation methods that simplify working with multiple generic types. 
export interface IComposite<T extends any[]> {
  <U extends Parameters<Last<T>>, S extends ReturnType<Head<T>>>(...args: U): S;
}



export interface IPipeline<T> {
  <U extends Parameters<Head<T>>, S extends ReturnType<Last<T>>>(...args: U): S;
}
