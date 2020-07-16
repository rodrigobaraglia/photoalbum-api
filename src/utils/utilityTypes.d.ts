import {Reverse as _Reverse} from "typescript-tuple"

export type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;

export type Tail<T extends any[]> = ((...t: T) => any) extends (
  _: any,
  ...tail: infer Rest
) => any
  ? Rest
  : [];

export type Length<T extends any[]> = T["length"];

export type Prepend<E, T extends any[]> = 
((head: E, ...args: T) => any) extends ((...args: infer U) => any) ? U : T
export type Pos<I extends any[]> = Length<I>
export type Next<I extends any[]> = Prepend<any, I>
export type Prev<I extends any[]> = Tail<I>

export type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
  0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>
  1: R
}[Pos<I> extends Length<T> ? 1 : 0]

export type ParamInfer<P> = P extends [a: infer A] ? A : never

export type MapReturns<Tuple extends any[]> = {
  [Index in keyof Tuple]: ReturnType<Tuple[Index]> 
} 

export type MapParams<Tuple extends any[]> = {
[Index in keyof Tuple]: ParamInfer<Parameters<Tuple[Index]>>
};
type test11<T extends any[]> = Reverse<Tail<MapParams<T>>>
// type test11<T extends any[]> = Tail<MapParams<T>>
type test12<T extends any[]> = Tail<_Reverse<MapReturns<T>>>

export type Params<T extends any[]> = Reverse<Tail<MapParams<T>>>
export type Returns<T extends any[]> = Tail<_Reverse<MapReturns<T>>>

export type _Returns<T> =  Tail<MapReturns<T>>
export type _Params<T> = Reverse<Tail<MapParams<T>>>;

export type __Returns<T> =  Tail<MapReturns<T>>
export type __Params<T> = Tail<MapParams<T>>;


export type Composibility<F> = Returns<F> extends Params<F> ? true : false;
