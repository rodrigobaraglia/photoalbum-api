import {Last} from "typescript-tuple"
import {Head, Composibility} from "./utilities"

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

