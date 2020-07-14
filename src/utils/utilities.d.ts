type Fun = ((...args: any) => any)

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

type Message<T> = {
    0: "Everything's fine";
    1: "That's a bullshit type";
}[T extends true ? 0 : 1]


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

type IsCompatible<T extends any[], R extends any[] = [], I extends any[] = []> = {
    0: Head<T> extends Fun ? Iter<Prepend<true,R>, Next<I>> : Iter<Prepend<false,R>, Next<I>>
    1: R
} [Pos<I> extends Length<T> ? 1 : 0]
type test18 = IsCompatible<notOk>

type Concat<T1 extends any[], T2 extends any[]> = 
Reverse<Cast<Reverse<T1>, any[]>, T2>

type test1 = Prepend<string, []>
type test2 = Prepend<number, [1,2]>
type test3 = Message<false>
type test4 = Length<test2>
type test5 = Length<Prepend<any, test2>>
type test6 = Drop<1, [0,1,2,3,4,5]>
type test7 = Cast<[string], ((...args:any)=>any)>
type test8 = Cast<[number, boolean, Drop<1,[1,2,3]>],  "hola mundo">
type test9 = Cast<"hola mundo", [number, boolean, Drop<1,[1,2,3]>]>
type iterator = [any, any, any]
type test10 = Pos<Next<iterator>>
type test11 = Pos<Prev<iterator>>
type test12 = Pos<Iter<10>>
type test13 = Reverse<[1,2,3]>
type test14 = Concat<[1,2], [3,4]>
type test15 = Concat<test13, []>


type ParamInfer<P> = P extends [a: infer A] ? A : never

// type MapReturns<Tuple extends [...any[]]> = {
//     [Index in keyof Tuple]: Cast<Tuple[Index]> extends ((...args: any) => any) ? ReturnType<Tuple[Index]> : never
//   } 


// type MapParams<Tuple extends [...any[]]> = {
//   [Index in keyof Tuple]: Tuple[Index] extends ((...args: any) => any)
//     ? ParamInfer<Parameters<Tuple[Index]>>
//     : never;
// };

type MapReturns<Tuple extends any[]> = {
  [Index in keyof Tuple]: ReturnType<Tuple[Index]> 
} 


type MapParams<Tuple extends any[]> = {
[Index in keyof Tuple]: ParamInfer<Parameters<Tuple[Index]>>
};



type GetReturns<Tuple extends any[]> = {
    [Index in keyof Tuple]: ReturnType<Tuple[Index]>
}

type A = Length<[1, 2, 3]>;
type A1 = Last<[1, 2, 3]>;

function sum1(x: number) {
  return x + 1;
}
function mult3(a: number) {
  return x * 3;
}
function log(x: number): string {
  return `${x}`;
}
function nothing() {
    return undefined
}
type Ok = [typeof mult3, typeof sum1, typeof sum1, typeof mult3];
type notOk = [typeof log, typeof nothing, typeof sum1, typeof mult3];
// type notOk = [typeof log, typeof sum1, typeof nothing, typeof mult3];
type test16 = Reverse<notOk>

type FunctionInfer<F> = F extends (...args: infer A) => infer R ? [A, R] : never
type TestMapParams = Tail<MapParams<isOk>>;
type TestMapReturns = Reverse<Tail<Reverse<MapReturns<isOk>>>>
// type TestMapParams2 = Drop<1, MapParams<isOk>>
// type TestMapParams3 = Reverse<MapParams<isOk>>;

// type _TestMapReturns<T extends any[]> = Tail<MapReturns<T>> extends [
//   any,
//   ...[any]
// ]
//   ? First<Tail<MapReturns<T>>>
//   : never;
type test20 = _TestMapReturns<isOk>
//Generalizar esto:
// type Returns<T> =  Reverse<Tail<Reverse<MapReturns<T>>>>
// type Params<T> = Tail<MapParams<T>>;
type Returns<T> =  Tail<MapReturns<T>>
type Params<T> = Reverse<Tail<MapParams<T>>>;
type TestZip = TestMapReturns extends TestMapParams ? true : false;
export type Composibility<F> = Returns<F> extends Params<F> ? true : false;
// export type Composable<T extends any[]> = {
// 0: T
// 1: ["Type Error","Required Params:", Params<T>,
// "Return Values:", Returns<T>]
// }[Composibility<T> extends true ? 0 : 1]
// //FUNCIONA!!!! SERÁ EN SERIO????
// type test21 = Composibility<Ok>
// type test22 = Composable<Ok>
// type test23 = Composibility<notOk>
// type test24 = Composable<notOk>
type test25 = Composibility<notOk>
// export type Composable<T> = {
//   0: T
//   1: never
//   }[Composibility<T> extends true ? 0 : 1]

  export type Composable<T> = Composibility<T> extends true ? T : never