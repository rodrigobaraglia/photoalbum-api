import {Reverse, Last, First} from "typescript-tuple"
import {Composibility, Composable as _Composable, Last as _Last, Head} from "./utilities"

export interface IAsync {
  <T extends any[], Z>(...args: T): Promise<Z>;
}

//Typescript-tuple provides tuple manipulation methods that simplify working with multiple generic types. 
export interface IComposite<T extends any[]> {
  <U extends Parameters<Last<T>>, S extends ReturnType<Head<T>>>(...args: U): S;
}

export interface IPipeline<T> {
  <U extends Parameters<Head<T>>, S extends ReturnType<Last<T>>>(...args: U): S;
}
