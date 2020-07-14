import {Reverse, Last, First} from "typescript-tuple"
import {Composibility, Composable as _Composable} from "./utilities"

export interface IAsync {
  <T extends any[], Z>(...args: T): Promise<Z>;
}


type HasTail<T extends any[]> =  T extends ([] | [any]) ? false : true
type ParamInfer<P> = P extends [a: infer A] ? A : never
type Prev<T extends any[]> = HasTail<T> extends true ? Tail<T>[0] : T
type PrevParams<T extends any[]> = Prev<T> extends ((...args:any) => any)? Parameters<Prev<T>> : never 
type MatchPrevParams<F extends ((...args:any) => any)> = ReturnType<F> extends ParamInfer<PrevParams<Fns>> ? true : false

type MapPrevParams<Tuple extends [...any[]]> = {
  [Index in keyof Tuple]: Tuple[Index] extends (...args:any)=>any ? MatchPrevParams<Tuple[Index]> : never;
} & {length: Tuple['length']};

type ReduceBool<Tuple extends [...any []]> = Tuple extends [true, ...true[]] ? true : false 
type Composable<T extends any[]> = ReduceBool<MapPrevParams<T>> extends true ? T : never

//Typescript-tuple provides tuple manipulation methods that simplify working with multiple generic types. 
export interface IComposite<T extends any[]> {
  <U extends Parameters<Last<T>>, S extends ReturnType<First<T>>>(...args: U): S;
}



export interface IPipeline<T> {
  <U extends Parameters<First<T>>, S extends ReturnType<Last<T>>>(...args: U): S;
}
