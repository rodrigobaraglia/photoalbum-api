import { Last, Reverse } from "typescript-tuple";
import { Head, Composibility } from "./utilityTypes";

export interface IStruct<T> {
  [prop: string]: T;
}

export type ForeignData = void | {[x:string]: any}

export type Pipeable<T> = Composibility<T> extends true ? T : never;
export type Composable<T> = Composibility<Reverse<T>> extends true ? T : never


export interface IComposite<T extends any[]> {
  <U extends Parameters<Last<T>>, S extends ReturnType<Head<T>>>(...args: U): S;
}

export interface IPipeline<T> {
  <U extends Parameters<Head<T>>, S extends ReturnType<Last<T>>>(...args: U): S;
}

