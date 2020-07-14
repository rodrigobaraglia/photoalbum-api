
type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;

type Tail<T extends any[]> = ((...t: T) => any) extends (
  _: any,
  ...tail: infer Rest
) => any
  ? Rest
  : [];

type HasTail<T extends any[]> = T extends [] | [any] ? false : true;

type Last<T extends any[]> = {
  0: Last<Tail<T>>;
  1: Head<T>;
}[HasTail<T> extends true ? 0 : 1];


type Length<T extends any[]> = T["length"];

type Prepend<E, T extends any[]> = 
((head: E, ...args: T) => any) extends ((...args: infer U) => any) ? U : T

type Drop<N extends number, T extends any[], I extends any[] = []> = {
    0: Drop<N, Tail<T>, Prepend<any, I>>
    1: T
}[Length<I> extends N ? 1 : 0]

export type Cast<X, Y> = X extends Y ? X : Y

type Pos<I extends any[]> = Length<I>
type Next<I extends any[]> = Prepend<any, I>
type Prev<I extends any[]> = Tail<I>

type Iter<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
    0: Iter<Index, Next<From>, Next<I>>
    1: From
}[Pos<I> extends Index ? 1 : 0]

type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
    0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>
    1: R
}[Pos<I> extends Length<T> ? 1 : 0]


type Concat<T1 extends any[], T2 extends any[]> = 
Reverse<Cast<Reverse<T1>, any[]>, T2>



type ParamInfer<P> = P extends [a: infer A] ? A : never



type MapReturns<Tuple extends any[]> = {
  [Index in keyof Tuple]: ReturnType<Tuple[Index]> 
} 


type MapParams<Tuple extends any[]> = {
[Index in keyof Tuple]: ParamInfer<Parameters<Tuple[Index]>>
};


type FunctionInfer<F> = F extends (...args: infer A) => infer R ? [A, R] : never
type Returns<T> =  Tail<MapReturns<T>>
type Params<T> = Reverse<Tail<MapParams<T>>>;

export type Composibility<F> = Returns<F> extends Params<F> ? true : false;



  export type Composable<T> = Composibility<T> extends true ? T : never