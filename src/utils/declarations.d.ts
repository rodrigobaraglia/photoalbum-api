import {Reverse} from "typescript-tuple"

export interface IAsync {
  <T extends any[], Z>(...args: T): Promise<Z>;
}

//Typescript-tuple provides tuple manipulation methods that simplify working with multiple generic types. 
export interface IComposite<T> {
  <U extends Parameters<Reverse<T>[0]>, S extends ReturnType<T[0]>>(...args: U): S;
}

export interface IPipeline<T> {
  <U extends Parameters<T[0]>, S extends ReturnType<Reverse<T>[0]>>(...args: U): S;
}
