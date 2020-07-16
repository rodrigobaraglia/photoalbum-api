import {IStruct, Pipeable, Composable, IComposite, IPipeline } from "./declarations";
import { Request } from "express";


export function compose<T extends any[]>(...fns: T): IComposite<T> {
    return function _compose(...args) {
      return fns.reduceRight((res, fn) => fn(res), args);
    };
  }
  
  export function pipe<T extends any[]>(...fns: T): IPipeline<T> {
    return function _pipe(...args) {
      return fns.reduce((res, fn) => fn(res), args);
    };
  }

export function pluckProps<T>(props: string[], o: IStruct<T>): IStruct<T> {
    return props.reduce((struct, prop) => ({ ...struct, [prop]: o[prop] }), {});
  }